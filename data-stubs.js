
const lettuceSummaryDataStub = {
    socialSecurityNumber: "123-45-6789",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1980-01-01",
    industryActivity: "Other",
    industryDescription: "Software Development",
    employerIdentificationNumber: "12-9443381",
    businessAddress: {
      country: "USA",
      street1: "123 Tech Lane",
      street2: "Suite 100",
      city: "San Francisco",
      state: "CA",
      postal: "94107"
    },
    mailingAddress: {
      country: 'USA',
      street: '2261 Market Street STE 22617',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94114'
    },
    businessPhoneNumber: "555-123-4567",
    businessEmail: "john.doe@example.com"
  };
  
  const articlesOrganizationDataStub = {
    organizationType: "Limited Liability Company",
    organizationLegalName: "Doe Technologies LLC",
    stateOfIncorporation: "CA",
    fileNumber: "987654321",
    dateFiled: "05/15/2020"
  };
  
  
  export const lettuceCustomerDataStub = {... lettuceSummaryDataStub, ...articlesOrganizationDataStub};
  
  export const formationsPayrollTicketStub = {
      createdAt: '2025-02-10T03:51:36.468Z',
      archived: false,
      id: '21388748586', // belongs to test ticket in Lettuce's Hubspot
      properties: {
        createdate: '2025-02-10T03:51:36.468Z',
        hs_lastmodifieddate: '2025-05-20T15:14:36.990Z',
        hs_object_id: '21388748586',
        hs_pipeline: '68570039',
        sharefile_folder_id: 'https://formations.sharefile.com/f/fo9bb72b-8018-4788-9d10-1232cb732830',
        state: 'CA',
        subject: '[PLLC] Lettuce Incorporation Request for John Doe'
      },
      updatedAt: '2025-05-20T15:14:36.990Z'
  }
  
  
  export const californiaCustomerDataStub = {
    articlesFileNumber: 'B20250091509',
    articlesFileDate: '4/25/2025',
    firstName: 'Test',
    lastName: 'Tester',
    dateOfBirth: '1984-04-16',
    industryName: 'Design & Creative',
    industryActivity: 'OTHER',
    industryDescription: "I'm a freelance designer. Companies of all sizes, many startups, hire me to design and build websites, presentations, etc.",
    industryIsLicensed: 'false',
    businessAddress: {
      street1: '3011 Central Ave',
      street2: '',
      city: 'Alameda',
      state: 'CA',
      postal: '94501'
    },
    mailingAddress: {
      street1: '3011 Central Ave',
      street2: '',
      city: 'Alameda',
      state: 'CA',
      postal: '94501'
    },
    businessPhoneNumber: '+13541335610',
    businessEmail: 'studio.example@gmail.com',
    businessName: 'Studio Example LLC',
    businessFormationType: 'LIMITED LIABILITY COMPANY',
    employerIdentificationNumber: '12-7654321',
    socialSecurityNumber: '123-12-1234',
    stateOfIncorporation: 'CALIFORNIA',
    dateOfIncorporation: '04/25/2025',
    businessLegalName: 'STUDIO EXAMPLE LLC',
    electionEffectiveDate: '05/26/2025'
  }
  
  // TODO: Make Dates dynamic
  export const baseCustomerDataStub = {
    // Lettuce Summary Info
    firstName: 'Test',
    lastName: 'Tester',
    dateOfBirth: '1984-04-16',
    industryName: 'Design & Creative',
    industryActivity: 'OTHER',
    industryDescription: "I'm a freelance designer. Companies of all sizes, many startups, hire me to design and build websites, presentations, etc.",
    industryIsLicensed: 'false', 
    // soon also NAICS code
    businessAddress: {
      street1: '3011 Central Ave',
      street2: '',
      city: 'Alameda',
      state: 'CA',
      postal: '94501'
    },
    mailingAddress: {
      street1: '3011 Central Ave',
      street2: '',
      city: 'Alameda',
      state: 'CA',
      postal: '94501'
    },
    businessPhoneNumber: '+13541335610',
    businessEmail: 'studio.example@gmail.com',
    businessName: 'Studio Example LLC',
    businessFormationType: 'LIMITED LIABILITY COMPANY',
    // 2553s Info
    employerIdentificationNumber: '12-7654321',
    socialSecurityNumber: '123-12-1234',
    stateOfIncorporation: 'CALIFORNIA',
    dateOfIncorporation: '04/25/2025',
    businessLegalName: 'STUDIO EXAMPLE LLC',
    electionEffectiveDate: '05/26/2025' 
  }
  
  export const formationsDataStub = {
      formationsEmail: 'example@gmail.com',
      formationsPhone: '12312341234',
      formationsFirstName: 'Test',
      formationsLastName: 'Tester',
  }