# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Dev code complete of tickets assumes completed functionality of acceptance criteria, new unit tests written for new functionality, and all existing tests still pass.

***
### Ticket 1: (Data) Facitlites to save custom Agent Ids

**User Story**: As a Facility admin I would like to save a custom id for an agent.  
**Description**: DDL to allow Facilities to save their own custom ids for each Agent.  
**Acceptance Criteria**:
  - DDL case to update Agents table schema
    - New column `customAgentIdFacilityMap` to store JSON object
      - Default null (implies no Facilities with custom ids)
      - string key of Facility id
      - string value of custom id
      - can store many key/value pairs of Facility custom ids

**LOE Estimate**: small (~2 hrs)

***

### Ticket 2: (BE) Facitlites to save custom Agent Ids


**User Story**: As a Facility admin I would like to save a custom id for an agent.  
**Description**: Back-end work to allow Facilities to save their own custom ids for each Agent.  
**Acceptance Criteria**:
  - New API endpoint to create/update custom Agent Id by Facility
    - Sanatize and validate posted data for min/max lengths and data types
    - Lookup Agent id by agent name/db id
    - Get agents `customAgentIdFacilityMap` created in *Ticket 1*
    - Store in DB
      - If null, create new JSON object with first key/value of facilityId/customAgentId
      - Create new record if facilityId key does not exist
      - Update value with new custom value if it does exist 
    - Try/catch for exceptions on DB creation/insertion
    - Return success 200 or any errors (i.e. failed validation or DB failure)  

**LOE Estimate**: medium (~4 hrs)   
***

### Ticket 3: (FE) Facilities to save custom Agent Ids

**User Story**: As a Facility admin I would like to save a custom id for an agent.  
**Description**: Front-end work to allow Facilities to save their own custom ids for each Agent.  
**Acceptance Criteria**:
  - Form to accept custom id for an agent
    - Fetch agents to populate agent selection dropdown (assuming BE endpoint to get all agents already exists)
      - Display agent by name, and custom id if already created (e.g. **John Doe - JD123** or **John Doe**)
    - Include text input for custom agent id
    - Sanatize and validate inputs according to min/max lengths and data types
    - Submit button to *Create Custom Id*
  - Send API post of form data on button submission
    - Send form data (facility id, agent name, agent db id, new custom agent id) of agent to new BE endpoint created in *Ticket 2*
    - Include loading state while awaiting
    - Show success/failure notification upon completion  

**LOE Estimate**: medium (~4 hours)

***


### Ticket 4: (BE) Facilities to generate report with custom Agent Ids

**User Story**: As a Facility admin I would like to generate a report with custom Agent ids
**Description**: Back-end work to allow Facilities to save their own custom ids for each Agent.  
**Acceptance Criteria**:
  - Look up if agent custom id exists in `customAgentIdFacilityMap` by facility id
  - Update `getShiftsByFacility` function to include agent custom id (if exists)
  - Update `generateReport` function to use agent custom id (if exists)  

**LOE Estimate**: small (~1 hr)

***
