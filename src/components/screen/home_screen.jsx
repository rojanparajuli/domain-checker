import React, { useState } from "react";
import { Form, Button, Card, Spinner, Alert, Container, Row, Col, Toast } from "react-bootstrap";
import Api from "../api/api";
import "..//Css/home.css"; 

function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showToast, setShowToast] = useState(false); 

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    if (!domain || !domain.includes('.')) {
      setLoading(false);
      setShowToast(true); 
      return;
    }

    try {
      const response = await fetch(Api.getUrl(domain));
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="domain-search-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-lg border-0">
            <h2 className="text-center mb-4">Domain Search</h2>
            <Form onSubmit={handleSearch}>
              <Form.Group controlId="domainSearch">
                <Form.Label>Domain Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter domain name"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="input-large mb-3"
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="btn-large w-100" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Search"}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {result && (
              <Card className="mt-4">
                <Card.Body>
                  <h5 className="mb-3">Search Results</h5>
                  {result.domains.length > 0 ? (
                    result.domains.map((item, index) => (
                      <div key={index} className="p-3 border rounded mb-3 bg-light">
                        <strong>Domain:</strong> {item.domain}<br />
                        <strong>Create Date:</strong> {item.create_date}<br />
                        <strong>Update Date:</strong> {item.update_date}<br />
                        <strong>Country:</strong> {item.country || "N/A"}<br />
                        <strong>Status:</strong> {item.isDead === "False" ? "Active" : "Inactive"}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No domains found.</p>
                  )}
                </Card.Body>
              </Card>
            )}
          </Card>

          <Toast 
            onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={3000} 
            autohide 
            className="mt-3"
          >
            <Toast.Body className="text-danger">Please enter a valid domain name containing a dot.</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}

export default DomainSearch;
