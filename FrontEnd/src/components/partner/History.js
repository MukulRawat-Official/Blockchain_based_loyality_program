import React from 'react';
import Container from 'react-bootstrap/Container';

    function History({ title }) {
        const sectionStyle = {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:"#ffd5ff"
       }
    return (
        
        <div id="history" className="section" style={sectionStyle}>
            <Container>
                <h2>{title}</h2>
                {/* Add content specific to each section */}
                <p>This is the content for the {title} section.</p>
            </Container>
        </div>
    );
}

export default History;

