import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* {title corona case } */}
                <Typography className='infoBox__title' color="texSecondary">
                    {title}
                </Typography>
                 <h2 className='infoBox__case'>{cases}</h2>
                {/* {title 120K number case} */}
                <Typography className='infoBox__total' color="texSecondary">
                    {total} Total
                </Typography>
                {/* {title 1.2MTotal} */}
            </CardContent>
        </Card>
    )
}

export default InfoBox
