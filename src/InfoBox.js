import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './infoBox.css';
function InfoBox({title, cases, total}) {
    return (
        <Card className="card_covid" Style="background-color: #ffffff2a;">
            <CardContent>
                {/* {title corona case } */}
                <Typography className='infoBox__title'>
                    <h2>{title}</h2>
                </Typography>
                <div className='infoBox__caseP'><h2>Today</h2></div>
                <h2 className='infoBox__case'> {cases}</h2>
                {/* {title 120K number case} */}
                <Typography className='infoBox__total' >
                    {total} Total
                </Typography>
                {/* {title 1.2MTotal} */}
            </CardContent>
        </Card>
    )
}

export default InfoBox
