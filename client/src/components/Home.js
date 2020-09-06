import React from 'react'
// import { Jumbotron, Button } from 'reactstrap'
import { UncontrolledCarousel, Jumbotron, Container } from 'reactstrap';

const items = [
  // {
  //   src: './images/home/car1.png',
  //   altText: 'Slide 1',
  //   caption: '',
  //   header: 'Kisaan Darshan',
  //   key: '1'
  // },
  {
    src: './images/home/car2.jpg',
    altText: 'Slide 2',
    caption: '',
    header: 'Kisaan Darshan',
    key: '2'
  },
  // {
  //   src: './images/home/car3.jpg',
  //   altText: 'Slide 3',
  //   caption: '',
  //   header: 'Kisaan Darshan',
  //   key: '3'
  // }
];


const Home = () => {
  return(
    <div>
      <UncontrolledCarousel items={items} />
      
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to Kisaan Darshan</h1>
          <p className="lead">
            Kisaan Darshan enables farmers to lead the world of agricultural system. Here stakeholders' viz.
            investors, markets, consumers, intellectuals and professionals along with government entities 
            interact seamlessly with respect to farmers and farming community.
          </p>
        </Container>
      </Jumbotron>
      
    </div>
  )
} 

export default Home