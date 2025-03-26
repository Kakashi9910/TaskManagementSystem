import { Form, Dropdown, InputGroup, Button } from "react-bootstrap";
import { Search } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterSearch = ({filter,setFilter}) => {
  return (
    <div className="d-flex justify-content-between align-items-center m-2">
      {/* Left Section - Filters */}
      <div className="d-flex align-items-center">
        <span className="me-2 text-muted">Filter by:</span>

        {/* Category Dropdown */}
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="outline-secondary">{filter || 'Category'}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>setFilter('Work')}>Work</Dropdown.Item>
            <Dropdown.Item onClick={()=>setFilter('Personal')}>Personal</Dropdown.Item>
            <Dropdown.Item onClick={()=>setFilter('Urgent')}>Urgent</Dropdown.Item>
            <Dropdown.Item onClick={()=>setFilter('')}>Remove Filter</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

        {/* Due Date Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">Due Date</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>This Week</Dropdown.Item>
            <Dropdown.Item>Next Month</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Right Section - Search Input */}
      <InputGroup className="w-auto hide" style={{ maxWidth: "250px" }}>
        <InputGroup.Text>
          <Search size={16} />
        </InputGroup.Text>
        <Form.Control type="text" placeholder="Search" />
      </InputGroup>
    </div>
  );
};

export default FilterSearch;
