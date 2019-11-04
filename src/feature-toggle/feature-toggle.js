/**
 *  Implement a way to show/hide sections of an app based on roles obtained dynamically.
 */

import React from 'react'

/* Mock API call to get user roles */
const getRoles = async () => ['admin']

const AdminContent = () => <div> Admin content </div>
const RegularContent = () => <div> Regular content </div>

function App() {
  return (
    <>
      <AdminContent></AdminContent>
      <RegularContent></RegularContent>
    </>
  )
}
