import React from 'react'

import { Card } from 'primereact/card';
import ReactMarkdown from 'react-markdown';

const markdown = `
# Rapid Oracle Web3 Application

Welcome to Rapid Oracle, your go-to marketplace for Chainlink functions! Rapid Oracle allows users to list, discover, and interact with Chainlink functions, whether they are paid or free. In addition to exploring and listing functions, users can also subscribe to functions that meet their needs.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Listing Functions](#listing-functions)
  - [Viewing Functions](#viewing-functions)
  - [Subscribing to Functions](#subscribing-to-functions)
  - [Managing Functions](#managing-functions)
- [Development](#development)
  - [Frontend](#frontend)
  - [Smart Contracts and Backend](#smart-contracts-and-backend)
- [Contributors](#contributors)
- [License](#license)

## Features

1. **List Functions:** Users can list their Chainlink functions on Rapid Oracle, providing a marketplace for other users to discover and utilize.

2. **Explore Functions:** Rapid Oracle serves as a hub for users to explore both free and paid Chainlink functions listed by others.

3. **Subscribe to Functions:** Users can subscribe to functions that match their requirements, enabling them to receive updates and notifications.

4. **Manage Functions:** The application allows users to view and manage the functions they have listed, as well as those to which they are subscribed.

## Getting Started

### Prerequisites

To use Rapid Oracle, you need the following:

- MetaMask wallet connected to the Ethereum network.
- Internet browser with MetaMask extension installed.

### Installation
1. **Clone the repository:**
        git clone https://github.com/IKalonji/rapid-oracle

## Installation

1. **Clone the repository:**
    git clone https://github.com/IKalonji/rapid-oracle


2. **Navigate to the project directory:**
    cd rapid-oracle

3. **Install dependencies:**
    npm install


## Usage

### Listing Functions

To list a new Chainlink function, make sure your MetaMask wallet is connected, and navigate to the "List Function" page. Fill in the required details and submit the form.

### Viewing Functions

Explore functions listed by other users by visiting the "Explore" page. Filter functions based on your criteria and find the ones that suit your needs.

### Subscribing to Functions

Subscribe to functions that interest you on the "Explore" page. Receive updates and notifications when subscribed functions are updated or modified.

### Managing Functions

Access the "Manage Functions" page to view and manage the functions you have listed and those to which you are subscribed. Ensure your MetaMask wallet is connected for authentication.

## Development

Rapid Oracle is developed by two talented developers:

### Frontend
- **Developer:** Zaden Ngobeni

### Smart Contracts and Backend
- **Developer:** Issa Kalonji

## Contributors

- Zaden Ngobeni
- Issa Kalonji

## License

This project is licensed under the [MIT License](LICENSE). Feel free to fork, modify, and use it in your projects. Happy coding!
`

const DocumentationPage = () => {

  return (
    <div className="flex flex-column">
        <div className='h-20' style={{height:"12px"}}></div>

    <div className='flex pl-5 pd-5'>
        
        <Card style={{width:"75%"}}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </Card>
    </div>
        
        <div className='h-20' style={{height:"200px"}}></div>
    </div>
  )
}

export default DocumentationPage