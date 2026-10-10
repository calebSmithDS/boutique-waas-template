import React from 'react'

export const CustomLogo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
      {/* You can replace this block with an <img src="..." /> of your actual logo */}
      <div style={{ width: '24px', height: '24px', backgroundColor: '#c2561a', borderRadius: '4px' }} />
      <span>WaaS Portal</span>
    </div>
  )
}