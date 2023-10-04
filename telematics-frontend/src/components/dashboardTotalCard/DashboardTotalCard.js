import React from 'react'
import Card from './Card'

const DashboardTotalCard = () => {

    let cardList = [
        { title: 'Total Moderators', value: '+10%' },
        { title: 'Total Resellers', value: '+3%' },
        { title: 'New Customers', value: '-2%' },
        { title: 'Sales', value: '+5%' },
    ]

  return (
    <div class="container-fluid py-4">
      <div class="row">
        {
            cardList.map((card, index)=>(
                <Card title={card.title} value={card.value} />
            ))
        }
      </div>
    </div>
  )
}

export default DashboardTotalCard