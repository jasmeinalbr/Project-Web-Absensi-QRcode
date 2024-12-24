import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Box } from '@mui/material';
import { Pagination } from '@mui/lab';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { semuaPegawai } from '@/services/pegawaiApi';

interface UserProfile {
  nama: string;
  email: string;
  peran: string;
}

function DaftarPegawai() {
  const [dataPegawai, setDataPegawai] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const data = useSelector((state: any) => state.data.data);
  const router = useRouter();

  // Memoize fungsi ambilData
  const ambilData = useCallback(async () => {
    try {
      const respon = await semuaPegawai(page);
      setDataPegawai(respon.data);
      setTotalPages(respon.totalHalaman);
    } catch (error) {
      console.error('Gagal mengambil data pegawai:', error);
    }
  }, [page]); // Tambahkan 'page' sebagai dependency

  useEffect(() => {
    const cekProfil = async () => {
      if (!data || !data.nama) {
        router.push('/');
        return;
      }
      ambilData();
    };
    cekProfil();
  }, [data, router, ambilData]); // Tambahkan 'router' dan 'ambilData' sebagai dependency

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
          List of Employees
          </Typography>

          <TableContainer component={Box} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
          <Table>
          {/* Header Tabel */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F6FAFF' }}>
              <TableCell
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '800',
                  fontSize: '14px',
                  color: '#0F163B',
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '800',
                  fontSize: '14px',
                  color: '#0F163B',
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '800',
                  fontSize: '14px',
                  color: '#0F163B',
                }}
              >
                Role
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Body Tabel */}
          <TableBody>
            {Array.isArray(dataPegawai) && dataPegawai.length > 0 ? (
              dataPegawai.map((pegawai) => (
                <TableRow key={pegawai.email}>
                  <TableCell
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: 'black',
                    }}
                  >
                    {pegawai.nama}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: 'black',
                    }}
                  >
                    {pegawai.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: 'black',
                    }}
                  >
                    {pegawai.peran}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: 'black',
                  }}
                >
                  There is no employee data
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
}

export default DaftarPegawai;
