import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import { Pagination } from '@mui/lab';
import Layout from '@/components/Layout';
import { semuaKehadiran } from '@/services/kehadiranApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ubahTanggal } from '@/services/utils';
import { WS_BASE_URL } from '@/services/configService';

interface Pegawai {
  _id: string;
  nama: string;
}
interface Kehadiran {
  _id: string;
  pegawai: Pegawai;
  datang: string;
  pulang: string;
}

const DaftarKehadiran: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataKehadiran, setDataKehadiran] = useState<Kehadiran[]>([]);
  const data = useSelector((state: any) => state.data.data);
  const router = useRouter();

  // Memoize fungsi ambilData
  const ambilData = useCallback(async () => {
    try {
      const respon = await semuaKehadiran(page);
      console.log(respon.kehadiran);
      setDataKehadiran(respon.kehadiran);
      setTotalPages(respon.halamanInfo.totalHalaman);
    } catch (error) {
      console.error(error);
    }
  }, [page]); // Tambahkan 'page' sebagai dependency

  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.nama === 'undefined') {
        router.push('/');
        return;
      }
      ambilData();
    };
    cekProfil();
  }, [data, page, ambilData, router]); // Tambahkan 'ambilData' dan 'router' sebagai dependency

  useEffect(() => {
    const ws = new WebSocket(WS_BASE_URL);

    ws.addEventListener('message', (event) => {
      console.log('WebSocket message received:', event);
      ambilData(); // Gunakan fungsi yang stabil
    });

    return () => {
      ws.removeEventListener('message', ambilData);
      ws.close();
    };
  }, [ambilData]); // Tambahkan 'ambilData' sebagai dependency

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ padding: 4 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{
            fontFamily: '"Nunito", sans-serif',
            fontWeight: '600',
            fontSize: '24px',
            color: '#0F163B',
            marginBottom: '24px',
          }}
        >
        Attendance list
        </Typography>

        <TableContainer component={Box} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
          <Table>
          {/* Header Tabel */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F6FAFF' }}>
              <TableCell sx={{
                fontFamily: 'Open Sans',
                fontWeight: '800',
                fontSize: '14px', 
                color: '#0F163B',
              }}>Name</TableCell>
              <TableCell sx={{
                fontFamily: 'Open Sans',
                fontWeight: '800',
                fontSize: '14px', 
                color: '#0F163B',
              }}>Check-in</TableCell>
              <TableCell sx={{
                fontFamily: 'Open Sans',
                fontWeight: '800',
                fontSize: '14px', 
                color: '#0F163B',
              }}>Check-out</TableCell>
            </TableRow>
          </TableHead>
          
          {/* Body Tabel */}
          <TableBody>
            {Array.isArray(dataKehadiran) && dataKehadiran.length > 0 ? (
              dataKehadiran.map((kehadiran) => (
                <TableRow key={kehadiran._id}>
                  <TableCell sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '500',
                    fontSize: '14px', 
                    color: 'black',
                    }}>{kehadiran.pegawai.nama}</TableCell>
                  <TableCell sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '500',
                    fontSize: '14px', 
                    color: 'black',
                    }}>{ubahTanggal(kehadiran.datang)}</TableCell>
                  <TableCell sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '500',
                    fontSize: '14px', 
                    color: 'black',
                    }}>{ubahTanggal(kehadiran.pulang)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" 
                sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '600',
                    fontSize: '16px', 
                    color: 'black',
                    }}>
                  There is no attendance data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
    <Pagination 
      count={totalPages} 
      page={page} 
      onChange={handlePageChange} 
      sx={{
        mt: 3, // Margin top
        '& .MuiPaginationItem-root': {
          color: '#0F163B', // Warna default teks (angka dan arrow)
        },
        '& .MuiPaginationItem-root:hover': {
          backgroundColor: '#0F163B', // Warna saat hover
        },
        '& .MuiPaginationItem-page.Mui-selected': {
          backgroundColor: '#4e89cd', // Warna bulatan halaman aktif
          color: '#fff', // Warna teks halaman aktif
          fontWeight: 'bold',
        },
        '& .MuiPaginationItem-previousNext': {
          color: '#4e89cd', // Warna untuk arrow (sebelumnya/selanjutnya)
        },
        '& .MuiPaginationItem-previousNext:hover': {
          backgroundColor: '#0F163B', // Warna background arrow saat hover
        },
      }} 
    />
    </Paper>
    </Container>
  </Layout>
  );
};

export default DaftarKehadiran;
