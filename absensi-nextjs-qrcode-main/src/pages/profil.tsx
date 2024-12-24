// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, CircularProgress, Box, Avatar } from '@mui/material';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface UserProfile {
  nama: string;
  email: string;
  peran: string;
}

const ProfilePage: React.FC = () => {
  const data = useSelector((state: any) => state.data.data);
  const router = useRouter();
  
  // State untuk menangani loading dan error
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const cekProfil = async () => {
      if (!data || !data.nama) {
        // Jika data tidak tersedia, arahkan ke halaman login
        router.push('/login');
        return;
      }
      setUser(data);  // Menyimpan data profil ke state
      setIsLoading(false);  // Set loading false setelah data siap
    };
    cekProfil();
  }, [data, router]);

  if (isLoading) {
    // Menampilkan loading spinner sebelum data siap
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ backgroundColor: '#EDF1F7' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Jika profil kosong, tampilkan pesan error atau redirect
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          Terjadi kesalahan, data profil tidak ditemukan.
        </Typography>
      </Container>
    );
  }

  return (
    <Layout>
    <Container maxWidth="sm" 
      sx={{ 
        padding: 4 
        }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: '16px',
            boxShadow: 'black',
            backgroundColor: 'white',
            textAlign: 'center', 
          }}
        >
          {/* Icon Profile */}
          <Avatar
            sx={{
              width: 50,
              height: 50,
              margin: '0 auto 12px',  // Centering avatar and giving space below
              border: '5px solid #EDF1F7',
              backgroundColor: '#4e89cd',  // Adjust icon background color
            }}
          >
            <img 
            src="/img/profile.png" 
            alt="Logo Attendify" 
            style={{
              width: '50px',
              height: '50px',
            }} 
            />
          </Avatar>

          <Typography gutterBottom 
          sx={{
            fontFamily: '"Nunito", sans-serif',
            fontWeight: '600',
            fontSize: '20px', 
            color: '#0F163B',
            marginBottom: '18px'
          }}>
            User Profile
          </Typography>

          {/* Box for profile data */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ backgroundColor: '#F6FAFF', padding: 2, borderRadius: 4, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography 
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: '400',
                fontSize: '16px', 
                color: '#0F163B',
              }}>
                <strong>Name :</strong> {user.nama}
              </Typography>
            </Box>

            <Box sx={{ backgroundColor: '#F6FAFF', padding: 2, borderRadius: 4, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography 
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: '400',
                fontSize: '16px', 
                color: '#0F163B',
              }}>
                <strong>Email :</strong> {user.email}
              </Typography>
            </Box>

            <Box sx={{ backgroundColor: '#F6FAFF', padding: 2, borderRadius: 4, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography 
              sx={{
                fontFamily: 'Open Sans',
                fontWeight: '400',
                fontSize: '16px', 
                color: '#0F163B',
              }}>
                <strong>Role :</strong> {user.peran}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
