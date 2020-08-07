import React from 'react'
// import { Jumbotron, Button } from 'reactstrap'
import { UncontrolledCarousel, Jumbotron, Container } from 'reactstrap';

const items = [
  {
    src: './images/home/car1.png',
    altText: 'Slide 1',
    caption: '',
    header: 'Kisaan Darshan',
    key: '1'
  },
  {
    src: './images/home/car2.jpg',
    altText: 'Slide 2',
    caption: '',
    header: 'Kisaan Darshan',
    key: '2'
  },
  {
    src: './images/home/car3.jpg',
    altText: 'Slide 3',
    caption: '',
    header: 'Kisaan Darshan',
    key: '3'
  }
];


const Home = () => {
  return(
    <div>
      <UncontrolledCarousel items={items} />
      
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to Kisaan Darshan</h1>
          <p className="lead">
            Kisaan Darshan a medium to cater the need of farmers world. The idea is to bring all stakeholders on single platform where all interact seemingly with respect to farmers and farming community. It will help in reducing the communication gap between all components of agricultural system. With each passing days digitization becoming real and compelling in such scenario Indian farmers should also be not left behind.
            Agriculture a time dependent system so our knowledge base system should readily be available with the solutions at all stages of agricultural system in real time – realization of the concept “Lab to Land”.
            Farming is a full time business; farmers must realize it to have the sense of entitlement particularly small and marginal farmers. Kishan Darshan provides an opportunity by involving in marketing of own produce, analyzing the cost and market demand and by allowing to interact with industry experts.
            Real time primary unedited and un-manipulated data will be easily accessible through Kishan Darshan to agricultural policy makers be it our government or private players. The platform through the information aims to industrial setup at village level by identifying the potential of particular village – An opportunity for investors and local vendors.
            Finally consumer will get the opportunity to not only know their farmers and farming tradition but also be able purchase quality produce directly from them – Farm to Fork.

          </p>
        </Container>
      </Jumbotron>
      
    </div>
  )
} 

export default Home


// class Home extends Component {
//   render() {
//     return (
//       <div>
//         <Jumbotron>
//           <h1 className="display-3">Welcome to Kisaan Darshan</h1>
//           <p className="lead">
//             Farmers leading the world of agricultural ecosystem through Kisaan Darshan where all 
//             stockholders of agriculture viz. investors, markets, consumers, intellectuals &amp; 
//             professionals along with government entities interacts freely center to farmers and 
//             farming community.
//           </p>
//           <hr className="my-2" />
//           <p>
//             Kisaan Darshan enables farmers to lead the world of agricultural systems. Here all the 
//             stakeholders viz. investors, markets, consumers, intellectuals &amp; professionals along with
//              government entities interact freely with respect to farmers and farming communities.
//           </p>
//           <p className="lead">
//             <Button color="primary">Login</Button>
//           </p>
//         </Jumbotron>
//       </div>
//     )
//   }
// }

// export default Home