import {z} from "zod";

export const lettuceSummaryData = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string().min(1),
    industryName: z.string(),
    industryActivity: z.string().min(1),
    industryDescription: z.string().min(1),
    industryIsLicensed: z.string(),
    businessAddress: z.object({
        street1: z.string().min(1),
        street2: z.string(),
        city: z.string().min(1),
        state: z.string().min(1),
        postal: z.string().min(1),
    }),
    mailingAddress: z.object({
        street1: z.string().min(1),
        street2: z.string(),
        city: z.string().min(1),
        state: z.string().min(1),
        postal: z.string().min(1),
    }),
    businessPhoneNumber: z.string().min(1),
    businessEmail: z.string().min(1),
    businessName: z.string().min(1),
    businessFormationType: z.string(),
});

export const s2553Data = z.object({
    employerIdentificationNumber: z.string().min(1),
    socialSecurityNumber: z.string().min(1),
    stateOfIncorporation: z.string().min(1),
    dateOfIncorporation: z.string().min(1),
    businessLegalName: z.string().min(1),
    electionEffectiveDate: z.string().min(1),
})

export const baseCustomerData = lettuceSummaryData.merge(s2553Data)

export const californiaCustomerData = z.object({
    articlesFileNumber: z.string().min(1),
    articlesFileDate: z.string().min(1),
}).merge(baseCustomerData);

export const formationsData = {
    formationsEmail: process.env.FORMATIONS_EMAIL,
    formationsPhone: process.env.FORMATIONS_PHONE,
    formationsFirstName: process.env.FORMATIONS_FIRST_NAME,
    formationsLastName: process.env.FORMATIONS_LAST_NAME,
}