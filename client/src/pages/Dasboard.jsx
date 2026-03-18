import React from 'react'
import AppLayout from '../layouts/AppLayout'
import { Link } from 'react-router-dom'

const Dasboard = () => {
  return (
    <AppLayout>
      <div>
        <h1>Dashboard</h1>
        <div>
          <Link to="/dashboard/users/">Users</Link>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dasboard