import React from 'react';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const Box = styled.div`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    flex: 1 1 calc(100% - 40px);
    box-sizing: border-box;

    @media (max-width: 1200px) {
        flex: 1 1 calc(33.333% - 40px);
    }

    @media (max-width: 900px) {
        flex: 1 1 calc(50% - 40px);
    }

    @media (max-width: 600px) {
        flex: 1 1 100%;
    }
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;
const DIV = styled.div `
    padding-top: 50px;
`;
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MainPage = () => {

    const { id } = useParams();


    return (
        <DIV>
            <h2>Menu</h2>
            <Container>
                <Box>
                    <Title>SUIContracts</Title>
                    <Link to={`/SUIContracts/${id}`} >
                        <Button>GO</Button>
                    </Link>
                </Box>
                <Box>
                    <Title>EtheriumContracts</Title>
                    <Link to={`/EtheriumContracts/${id}`} >
                        <Button>GO</Button>
                    </Link>
                </Box>

            </Container>
        </DIV>
    );
};

export default MainPage;