import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const allMenuItems = [
  { text: 'Profile', href: '/profil', perans: ['admin', 'pegawai'], icon: 'img/profile.png' },
  { text: 'Absence', href: '/absen', perans: ['pegawai'], icon: 'img/report.png' },
  { text: 'Check-in Code', href: '/kode/datang', perans: ['admin'], icon: 'img/qrcode.png' },
  { text: 'Check-out Code', href: '/kode/pulang', perans: ['admin'], icon: 'img/qrcode.png' },
  { text: 'Attendance List', href: '/daftar-kehadiran', perans: ['admin'], icon: 'img/report.png' },
  { text: 'List of Employees', href: '/daftar-pegawai', perans: ['admin'], icon: 'img/daftarpegawai.png' },
  { text: 'Employee Registration', href: '/registrasi-pegawai', perans: ['admin'], icon: 'img/regis.png' },
  { text: 'Logout', href: '/login?logout=true', perans: ['admin', 'pegawai'], icon: 'img/logout.png' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [peran, setPeran] = useState('pegawai')
  const data = useSelector((state: any) => state.data.data)
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();


  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.peran === 'undefined') {
        setPeran('pegawai')
        return
      }
      setPeran(data.peran)
    }
    cekProfil()
  }, [data])
  
  const menuItems = allMenuItems.filter((item) => item.perans.includes(peran));
  
  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop || open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          background: '#0F163B',
          fontFamily: '"Open Sans"', 
          color: 'white',
          top: '64px',
          left: 0,
          width: '240px'
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => {
          const isActive = router.pathname === item.href;
          return (
            <Link href={item.href} key={`k-${index}`} passHref>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: '#4e89cd',
                  },
                  width: '80%',
                  marginTop: '8px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#4e89cd' : 'transparent',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <ListItemIcon>
                  <img
                    src={item.icon}
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    fontFamily: '"Open Sans"',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 600, // Semi-bold
                  }}
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
