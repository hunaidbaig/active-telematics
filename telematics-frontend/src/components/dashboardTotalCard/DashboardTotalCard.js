import React from 'react'
import Card from './Card'

const DashboardTotalCard = ({data}) => {

    let cardList = [
        { title: 'Total Cars', total: `${data?.length}` },
        { title: 'Total Hours Processed ', total: `5` },
        { title: 'Total Face Recognized', total: `172`  },
        // { title: 'Sales', value: '+5%' },
    ]

  return (
    <div class="container-fluid py-4">
      <div class="row">
        {
            cardList.map((card, index)=>(
                <Card title={card.title} value={card.value} total={card.total} />
            ))
        }
      </div>
    </div>
  )
}

export default DashboardTotalCard