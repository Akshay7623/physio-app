import { Card, CardBody, CardFooter, CardHeader, Typography, Button } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'

const ServiceCard = (props) => {
    return (
        <>
            <Card className="mt-6">
                <Typography variant="h5" color="blue-gray" className="mb-2 px-6 pt-2">
                    {props?.title}
                </Typography>
                <CardHeader color="blue-gray" className="relative h-56 mt-4">
                    <img
                        src={props?.img}
                        alt="card-image"
                        className='cursor-pointer service-img'
                    />
                </CardHeader>
                <CardBody>
                    <Typography>
                        {props?.content.substring(0, 100) + '...'}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <NavLink to={props?.redirect}>
                        <Button>Read More</Button>
                    </NavLink>
                </CardFooter>
            </Card>
        </>
    )
}

export default ServiceCard