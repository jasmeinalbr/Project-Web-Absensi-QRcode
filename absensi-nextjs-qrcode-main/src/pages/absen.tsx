import React, { useState } from 'react';
import { Box, Container, Fab, Paper, Typography } from '@mui/material';
import { QrCodeScanner, Stop } from '@mui/icons-material';
import QrScanner from 'qr-scanner';
import Layout from '@/components/Layout';
import { absenKehadiran } from '@/services/kehadiranApi';
import { ubahTanggal } from '@/services/utils';

let stopScan = false;

const AbsensiScanner: React.FC = () => {
  const [btnScan, setBtnScan] = useState(true);
  const [hasilAbsen, setAbsen] = useState('');

  const absen = async (kodeScan: string) => {
    try {
      const data = JSON.parse(kodeScan)
      const respon = await absenKehadiran(data.kode, data.jenis)
      if (typeof respon !== 'undefined' && typeof respon.data !== 'undefined' && typeof respon.data[data.jenis] !== 'undefined') {
        const tanggal = ubahTanggal(`${respon.data[data.jenis]}`)
        setAbsen(`Absen ${data.jenis} tercatat pada ${tanggal}`)
      }
      console.log(respon)
    } catch (error) {
      console.error(error)
    }
  }

  const scanNow = async (isScan: boolean) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (btnScan === false) return;
    stopScan = false;
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById(
      'scanView',
    ) as HTMLVideoElement;
    const scanner = new QrScanner(
      videoElement,
      (result: { data: string }) => {
        absen(result.data);
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (error: any) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      },
    );
    await scanner.start();
    while (stopScan === false) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  }

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ padding: 4 }}>
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
          {btnScan === false && (
            <video
              id="scanView"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '100%',
                maxHeight: '400px',
                borderStyle: 'dotted',
                borderRadius: '16px',
              }}
            ></video>
          )}
          {btnScan && (
            <Box
              sx={{
                padding: 4,
                borderRadius: '16px',
                backgroundColor: '#4e89cd',
                color: 'white',
                textAlign: 'center',
                marginBottom: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: '600',
                  fontSize: '20px',
                  marginBottom: '12px',
                }}
              >
                Attendance Result :
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '400',
                  fontSize: '16px',
                }}
              >
                {hasilAbsen || 'Please scan the QR Code to attend'}
              </Typography>
            </Box>
          )}
          <Fab
            color={btnScan ? 'primary' : 'secondary'}
            onClick={() => scanNow(!btnScan)}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              boxShadow: 3,
            }}
          >
            {btnScan && <QrCodeScanner />}
            {btnScan === false && <Stop />}
          </Fab>
        </Paper>
      </Container>
    </Layout>
  );
};

export default AbsensiScanner;
