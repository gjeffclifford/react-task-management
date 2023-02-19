import { Inter } from '@next/font/google'
import React, { useState } from "react";
import Table from '@/components/Table';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <div className="m-10">
          <Table></Table>
        </div>
      </main>
    </>
  )
}
