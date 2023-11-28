import React from 'react'
import Card from './Card'

const DashboardTotalCard = ({data, faces, cars}) => {
  
    let cardList = [
        { title: 'Total Cars', total: `${data?.length === undefined ? 0 : data?.length}` },
        { title: 'Restricted Car Detected ', total: `${cars?.length === undefined ? 0 : cars?.length}` },
        { title: 'Restricted Faces Recognized', total: `${faces?.length === undefined ? 0 : faces?.length}`  },
        // { title: 'Sales', value: '+5%' },
    ]

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {
            cardList.map((card, index)=>(
                <Card key={index} title={card.title} value={card.value} total={card.total} />
            ))
        }
      </div>
    </div>
  )
}

export default DashboardTotalCard