import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Container, Typography, ToggleButtonGroup, ToggleButton, Snackbar, InputLabel, Box, Paper } from '@mui/material';
import { Alert } from '@mui/lab';
import Layout from '@/components/Layout';
import { registrasiPegawai } from '@/services/pegawaiApi';

function RegistrasiPegawai() {
  const [nama, setNama] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [peran, setPeran] = useState<string>('pegawai');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const respon = await registrasiPegawai(nama, email, password, peran);
      console.log('Registrasi berhasil:', respon);

      setAlertType('success');
      setAlertMessage('Registrasi berhasil');
      setAlertOpen(true);

      setNama('');
      setEmail('');
      setPassword('');
      setPeran('pegawai');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);

      setAlertType('error');
      setAlertMessage('Terjadi kesalahan saat registrasi');
      setAlertOpen(true);
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const handlePeranChange = (
    event: React.MouseEvent<HTMLElement>,
    peranBaru: string
  ) => {
    if (peranBaru !== null) {
      setPeran(peranBaru);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ padding: 4 }}>
        <Paper elevation={6}
          sx={{
            padding: 4,
            borderRadius: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            textAlign: 'center',
          }}
        >
          <Typography gutterBottom
            sx={{
              fontFamily: '"Nunito", sans-serif',
              fontWeight: '600',
              fontSize: '20px',
              color: '#0F163B',
              marginBottom: '12px',
            }}
          >
            Employee Registration
          </Typography>

          {/* Form Registrasi */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#0F163B',
                  textAlign: 'left',
                }}
              >
                Name
              </Typography>
              <TextField
                placeholder="Enter name"
                value={nama}
                onChange={handleChange(setNama)}
                fullWidth
                margin="normal"
                required
                sx={{
                  backgroundColor: '#F6FAFF',
                  borderRadius: '16px',
                  height: 40, // Tinggi kotak input
                  '& .MuiInputBase-input': {
                    padding: '8px 14px', // Padding teks dalam kotak input
                    fontSize: '14px', // Ukuran font
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#0F163B',
                  textAlign: 'left',
                }}
              >
                Email
              </Typography>
              <TextField
                placeholder="Enter email"
                value={email}
                onChange={handleChange(setEmail)}
                fullWidth
                margin="normal"
                required
                sx={{
                  backgroundColor: '#F6FAFF',
                  borderRadius: '16px',
                  height: 40, // Tinggi kotak input
                  '& .MuiInputBase-input': {
                    padding: '8px 14px', // Padding teks dalam kotak input
                    fontSize: '14px', // Ukuran font
                  },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#0F163B',
                  textAlign: 'left',
                }}
              >
                Password
              </Typography>
              <TextField
                placeholder="Enter password"
                value={password}
                onChange={handleChange(setPassword)}
                fullWidth
                margin="normal"
                type="password"
                required
                sx={{
                  backgroundColor: '#F6FAFF',
                  borderRadius: '16px',
                  height: 40, // Tinggi kotak input
                  '& .MuiInputBase-input': {
                    padding: '8px 14px', // Padding teks dalam kotak input
                    fontSize: '14px', // Ukuran font
                  },
                }}
              />
              <InputLabel
                htmlFor="peran"
                margin="dense"
                sx={{
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'Open Sans',
                  color: '#0F163B',
                }}
              >
                Role
              </InputLabel>
              <ToggleButtonGroup
                value={peran}
                exclusive
                onChange={handlePeranChange}
                aria-labelledby="peran"
                fullWidth
                sx={{
                  mt: 1, 
                  height: '36px', 
                  borderRadius: '16px',
                  '& .MuiToggleButton-root': {
                    backgroundColor: '#F6FAFF',
                    color: '#0F163B',
                    fontWeight: '600',
                    fontSize: '14px', 
                    padding: '6px 12px',
                    '&:hover': {
                      backgroundColor: '#F6FAFF',
                      color: '#0F163B',
                    }, 
                  },
                  '& .MuiToggleButton-root.Mui-selected': {
                    backgroundColor: '#4e89cd',
                    color: '#fff',
                  },
                }}
              >
              <ToggleButton
                value="pegawai"
                sx={{ fontWeight: 600, fontFamily: 'Open Sans', color: '#0F163B' }}
              >
                Employee
              </ToggleButton>
              <ToggleButton
                value="admin"
                sx={{ fontWeight: 600, fontFamily: 'Open Sans', color: '#0F163B' }}
              >
                Admin
              </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button
              type="submit"
              fullWidth
              sx={{
                marginTop: 4,
                height: '48px',
                width: { xs: '80%', sm: '60%', md: '40%' },
                backgroundColor: '#0F163B',
                borderRadius: '8px',
                fontFamily: 'Nunito',
                color: 'white', // Mengatur warna teks tombol
                '&:hover': {
                  backgroundColor: '#4e89cd', // Menjaga warna saat hover
                },
              }}
            >
              Register
            </Button>
          </form>

          {/* Snackbar */}
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleAlertClose}
              severity={alertType}
              sx={{
                width: '100%',
                backgroundColor: alertType === 'success' ? '#4caf50' : '#f44336',
                color: 'white',
              }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Layout>
  );
}

export default RegistrasiPegawai;