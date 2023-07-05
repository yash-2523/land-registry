import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import { Tab } from '@mui/material'
import { Tabs } from '@mui/material'
import { useState } from 'react'
import AllLands from '@/components/AllLands'
import MyLands from '@/components/MyLands'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [tabValue, setTabValue] = useState(0)
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <Navbar />
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        // className='d-flex justify-content-evenly'
        centered
      >
        <Tab value={0} label="Lands" className='col-6' />
        <Tab value={1} label="My lands" className='col-6' />
        <Tab value={2} label="Ongoing Deals" className='col-6' />
      </Tabs>

      {tabValue === 0 && <AllLands />}

      {tabValue === 1 && <MyLands />}

      {tabValue === 2 && <div className='d-flex pt-6 mt-5 justify-content-center align-items-center' style={{width: "100%", fontSize: "26px"}}>Comming Soon</div>}

    </div>
  )
}
