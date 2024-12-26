import React, { useEffect, useState, useCallback } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { loginApi, profil } from '@/services/pegawaiApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '@/services/store';
import { useRouter } from 'next/router';
import { getToken, setToken } from '@/services/configService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const data = useSelector((state: any) => state.data.data);

  // Ensuring token logic is handled on client side only
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures client-only logic is executed after the first render
  }, []);

  // Fungsi untuk mengambil profil
  const ambilProfil = useCallback(async () => {
    try {
      if (!getToken()) {
        const token = localStorage.getItem('token');
        if (!token) return false;
        setToken(token);
      }

      const respon = await profil();
      if (respon?.data) {
        dispatch(setData(respon.data));
        return !!respon.data.peran;
      }
    } catch (error) {
      console.error('Kesalahan mengambil profil:', error);
    }
    return false;
  }, [dispatch]);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    dispatch(setData({}));
    router.replace('/login');
  };

  // Cek jika sudah login atau logout
  useEffect(() => {
    const fetchData = async () => {
      const respon = await ambilProfil();
      if (respon) {
        router.push('/profil');
      }
    };

    if (query.logout !== undefined) {
      handleLogout();
    } else {
      fetchData();
    }
  }, [query, ambilProfil, router]);

  // Fungsi menangani login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setAlert({ open: true, message: 'Email dan password wajib diisi!' });
      return;
    }

    setLoading(true);
    try {
      const respon = await loginApi(email, password);
      if (respon?.token) {
        setToken(respon.token);
        localStorage.setItem('token', respon.token);
        if (await ambilProfil()) {
          router.push('/profil');
        }
      }
    } catch (error) {
      setAlert({ open: true, message: 'Email atau password salah!' });
      console.error('Kesalahan saat login:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row'}}
    sx={{
      height: '100vh',
      backgroundColor: '#0F163B',
      padding: { xs: '70px', sm: '40px', md: '80px' }, // Responsif padding
    }}
    >
      <Box
        sx={{
          flex: { xs: 0.5, sm: 1, md: 1.5 },
          padding: { sm: '20px 60px 20px 0px', md: '20px 60px 20px 0px', lg: '20px 60px 20px 0px'}, // Responsif padding
          display: { xs: 'none', sm: 'none', md: 'flex' }, // Disembunyikan di layar xs
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0F163B',
        }}
      >
          <Typography component="div"
          sx={{
            fontFamily: '"Nunito", sans-serif',  
            fontWeight: '1000',
            color: 'white',
            fontSize: { xs: '30px', sm: '40px', md: '50px' }, 
          }}>
            Attendify <br />
            <Typography component="span"
            sx={{
              fontFamily: '"Open Sans", sans-serif',  
              fontWeight: '600',
              color: '#4e90cd',
              fontSize: { xs: '16px', sm: '20px', md: '28px' }, 
            }}>
              Attendance System with QRCode
            </Typography>
          </Typography>
          <Typography textAlign="left" 
          sx={{
            marginTop: 2,
            fontFamily: '"Open Sans", sans-serif',  
            fontWeight: '200',
            color: 'lightgray',
            fontSize: { xs: '12px', sm: '12px', md: '16px' }, 
          }}>
          "Effortlessly track attendance with Attendify! Scan your QR Code to record check-ins and check-outs in real-time, securely and efficiently."
          </Typography>
        </Box>

        {/* Bagian Form */}
        <Paper
          elevation={5}
          sx={{
            flex: { sm: 1.5, md: 1.5 },
            padding: { xs: 2, sm: 3, md: 4 }, // Padding yang responsif
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#EDF1F7',
            borderRadius: '16px',
            maxWidth: { xs: '100%', sm: '400px', md: '500px' }, // Maksimal lebar box
            height: { xs: '50%', sm: '85%', md: '97%' }, // Tinggi responsif
            margin: '0 auto', // Center alignment
            minHeight: '200px', // Minimum tinggi untuk memastikan tampilannya tidak terlalu kecil
            flexGrow: 1, // Biarkan elemen ini tumbuh dengan layar
          }}
        >
          <img 
            src="/img/logo.png" 
            alt="Logo Attendify" 
            style={{
              width: '50px',
              height: '50px',
              margin: '0 auto 10px', // Center alignment and margin below the logo
            }} 
          />
          <Typography align="center" 
          sx={{
            fontFamily: '"Nunito", sans-serif',  
            fontWeight: '1000',
            color: '#0F163B',
            fontSize: { xs: '18px', sm: '25px', md: '28px' }, 
          }}>
            Welcome Back!
          </Typography>
          <Typography align="center" 
          sx={{
            fontFamily: '"Nunito", sans-serif',  
            fontWeight: '1000',
            color: '#0F163B',
            fontSize: { xs: '14px', sm: '18px', md: '20px' }, 
          }}>
            Login to Your Account
          </Typography>
          <form onSubmit={handleSubmit}>
          <Typography
            sx={{
              fontFamily: '"Nunito", sans-serif',
              fontWeight: '600',
              fontSize: { xs: '14px', sm: '16px', md: '16px' } ,
              color: '#0F163B',
              marginTop: 2,
            }}
          >
          Email
          </Typography>
            <TextField
              value={email}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px', // Border radius seperti kode atas
                  height: { xs: 40, sm: 50 }, // Tinggi responsif seperti kode atas
                },
                '& .MuiInputBase-input': {
                  padding: { xs: '8px 14px', sm: '10px 16px' }, // Padding responsif
                  fontSize: { xs: '14px', sm: '16px' }, // Font size responsif
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontWeight: '600',
                fontSize: { xs: '14px', sm: '16px', md: '16px' } , 
                color: '#0F163B',
                marginTop: 2,
              }}
            >
            Password
            </Typography>
            <TextField
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px', // Border radius seperti kode atas
                  height: { xs: 40, sm: 50 }, // Tinggi responsif seperti kode atas
                },
                '& .MuiInputBase-input': {
                  padding: { xs: '8px 14px', sm: '10px 16px' }, // Padding responsif
                  fontSize: { xs: '14px', sm: '16px' }, // Font size responsif
                },
              }}
            />
            <Box textAlign="center" mt={2}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" 
                sx={{
                  marginTop: 2,
                  height: '48px',
                  width: { xs: '60%', sm: '60%', md: '40%' },
                  backgroundColor: '#0F163B',
                  borderRadius: '8px',
                  fontFamily: 'Nunito',
                  fontSize: { xs: '12px', sm: '16px' },
                  color: 'white', // Mengatur warna teks tombol
                  '&:hover': {
                    backgroundColor: '#4e89cd', // Menjaga warna saat hover
                  },
                }}
                >
                  Login
                </Button>
              )}
            </Box>
          </form>
          <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert onClose={handleCloseAlert} severity="error" variant="filled">
            {alert.message}
          </Alert>
        </Snackbar>
        </Paper>    
    </Box>
  );
}

export default LoginPage;
