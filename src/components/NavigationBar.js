import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaMap, FaUtensils } from 'react-icons/fa';

const NavigationBar = () => {
    return (
        <Nav>
            <NavItem>
                <Link to="/">
                    <FaHome />
                    <span>Home</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/map">
                    <FaMap />
                    <span>Map</span>
                </Link>
            </NavItem>
            <NavItem>
                <Link to="/recipe">
                    <FaUtensils />
                    <span>Recipe</span>
                </Link>
            </NavItem>
        </Nav>
    );
};

export default NavigationBar;

const Nav = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #55A416;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
`;

const NavItem = styled.div`
    flex: 1;
    text-align: center;

    a {
        color: #FFFFFF;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;

        svg {
            font-size: 24px;
        }

        span {
            margin-top: 5px;
        }
    }

    a:hover {
        color: #007bff;
    }
`;

