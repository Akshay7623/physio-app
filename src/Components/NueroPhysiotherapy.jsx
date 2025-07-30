import { Card, CardBody, CardFooter, CardHeader, Typography, Button } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'

const NueroPhysiotherapy = (props) => {

  const healthConditions = [
    "facial palsy - Bell's palsy",
    "guillain-Barre syndrome(GBS)",
    "parkinson's disease",
    "peripheral nerve injury",
    "spinal cord injury",
    "stroke ",
    "traumatic brain injury"
  ]


  return (
    <>
      <Card className="mt-6">
        <Typography variant="h5" color="blue-gray" className="mb-2 px-6 pt-2">
          {props.title}
        </Typography>
        <CardHeader color="blue-gray" className="relative h-56 mt-4">
          <img
            src={props.img}
            alt="card-image"
            className='cursor-pointer service-img'
          />
        </CardHeader>
        <CardBody>
          {healthConditions.map((val, index) => {
            return (
              <NavLink key={val} to={`/treatment/${val}`}>
                <div className='flex flex-row gap-2 text-base my-1'>
                  <div className='mt-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className='font-semibold'>
                    {val}
                  </div>
                </div>
              </NavLink>
            )
          })}
        </CardBody>
        <CardFooter className="pt-0">
          <NavLink to={props.redirect}>
            <Button>Read More</Button>
          </NavLink>
        </CardFooter>
      </Card>
    </>
  )
}

export default NueroPhysiotherapy