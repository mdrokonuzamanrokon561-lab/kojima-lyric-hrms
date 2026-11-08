import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, UserCheck, UserX, Clock, Calendar, Building2, DollarSign, Briefcase, FileText,
  TrendingUp, Award, Settings, ShieldCheck, Search, Bell, Plus, Edit, Trash2, Eye, Filter,
  Download, Printer, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Menu, X,
  FilePlus, RefreshCw, Layers, CheckSquare, LogOut, ChevronDown, Activity, UserPlus, HardDrive
} from 'lucide-react';

// --- INITIAL SEED DATA FOR GARMENTS HRMS ---
const INITIAL_DEPARTMENTS = [
  { id: 'DEP-01', name: 'Sewing', head: 'Mr. Kabir Hossain', code: 'SEW', lineCount: 6, empCount: 85 },
  { id: 'DEP-02', name: 'Cutting', head: 'Md. Rafiqul Islam', code: 'CUT', lineCount: 2, empCount: 24 },
  { id: 'DEP-03', name: 'Finishing & Packing', head: 'Nasrin Sultana', code: 'FIN', lineCount: 3, empCount: 38 },
  { id: 'DEP-04', name: 'Quality Control (QC)', head: 'Tariqul Alam', code: 'QC', lineCount: 0, empCount: 18 },
  { id: 'DEP-05', name: 'Merchandising & IE', head: 'Farhana Ahmed', code: 'MER', lineCount: 0, empCount: 12 },
  { id: 'DEP-06', name: 'Maintenance & Utility', head: 'Engr. Shahinur Rahman', code: 'MNT', lineCount: 0, empCount: 15 },
  { id: 'DEP-07', name: 'HR & Administration', head: 'Ayesha Chowdhury', code: 'HR', lineCount: 0, empCount: 8 },
  { id: 'DEP-08', name: 'Accounts & Finance', head: 'Mahmud Hasan', code: 'ACC', lineCount: 0, empCount: 6 }
];

const INITIAL_LINES = [
  { id: 'L-01', name: 'Production Line 01 (Jacket)', dept: 'Sewing', supervisor: 'Abul Kalam', targetQty: 1200, currentHeadcount: 22 },
  { id: 'L-02', name: 'Production Line 02 (T-Shirt)', dept: 'Sewing', supervisor: 'Rokon Uddin', targetQty: 2500, currentHeadcount: 18 },
  { id: 'L-03', name: 'Production Line 03 (Denim Pant)', dept: 'Sewing', supervisor: 'Sumi Akhtar', targetQty: 1000, currentHeadcount: 25 },
  { id: 'L-04', name: 'Production Line 04 (Knit Top)', dept: 'Sewing', supervisor: 'Jahangir Alam', targetQty: 1800, currentHeadcount: 20 },
  { id: 'L-05', name: 'Auto Cutting Table A', dept: 'Cutting', supervisor: 'Babar Ali', targetQty: 5000, currentHeadcount: 12 },
  { id: 'L-06', name: 'Iron & Steam Line 1', dept: 'Finishing & Packing', supervisor: 'Hamida Begum', targetQty: 3000, currentHeadcount: 15 }
];

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-72623',
    name: 'Mst. Nurunnahar Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Ali Hossain',
    motherName: 'Rokeya Begum',
    dob: '1996-03-12',
    mobile: '+880 1711-072623',
    email: 'nurunnahar.72623@kojimalyric.com',
    nid: '19962692518072623',
    presentAddress: 'House 12, Line 4, Gazipur Sadar, Gazipur',
    permanentAddress: 'Vill: Char Fasson, Bhola',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2021-02-15',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-72685',
    name: 'Mst. Rikta Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Abul Kashem',
    motherName: 'Rahima Khatun',
    dob: '1997-07-21',
    mobile: '+880 1812-072685',
    email: 'rikta.72685@kojimalyric.com',
    nid: '19972692518072685',
    presentAddress: 'Block B, Savar, Dhaka',
    permanentAddress: 'Vill: Bhabanipur, Bogra',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2021-04-10',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 12, casual: 8, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-73756',
    name: 'Mst. Nipa Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Salam Miah',
    motherName: 'Suraiya Begum',
    dob: '1998-11-05',
    mobile: '+880 1913-073756',
    email: 'nipa.73756@kojimalyric.com',
    nid: '19982692518073756',
    presentAddress: 'Tongicross, Gazipur',
    permanentAddress: 'Vill: Rampur, Comilla',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2021-08-01',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-74088',
    name: 'Mst. Masuma Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Dulal Hossain',
    motherName: 'Halima Begum',
    dob: '1999-01-18',
    mobile: '+880 1614-074088',
    email: 'masuma.74088@kojimalyric.com',
    nid: '19992692518074088',
    presentAddress: 'Board Bazar, Gazipur',
    permanentAddress: 'Vill: Jalalpur, Pabna',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2021-10-15',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 7, sick: 14, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-74428',
    name: 'Mst. Shahanaj Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Kabir Mia',
    motherName: 'Kohinoor Begum',
    dob: '1997-09-30',
    mobile: '+880 1715-074428',
    email: 'shahanaj.74428@kojimalyric.com',
    nid: '19972692518074428',
    presentAddress: 'Jamgora, Savar, Dhaka',
    permanentAddress: 'Vill: Sadar, Mymensingh',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2022-01-10',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-75520',
    name: 'Mst. Sabana Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Rafiqul Islam',
    motherName: 'Jamila Khatun',
    dob: '1995-12-14',
    mobile: '+880 1816-075520',
    email: 'sabana.75520@kojimalyric.com',
    nid: '19952692518075520',
    presentAddress: 'Sector 7, Uttara, Dhaka',
    permanentAddress: 'Vill: Sherpur, Jamalpur',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2022-03-01',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 12, casual: 6, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-75870',
    name: 'Rikta Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Nazrul Islam',
    motherName: 'Kulsum Begum',
    dob: '1998-04-02',
    mobile: '+880 1917-075870',
    email: 'rikta.75870@kojimalyric.com',
    nid: '19982692518075870',
    presentAddress: 'Chowrashta, Gazipur',
    permanentAddress: 'Vill: Madhupur, Tangail',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2022-05-18',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-76267',
    name: 'Mst. Rabia Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Babul Miah',
    motherName: 'Asma Begum',
    dob: '2000-08-10',
    mobile: '+880 1618-076267',
    email: 'rabia.76267@kojimalyric.com',
    nid: '20002692518076267',
    presentAddress: 'Vogra Bypass, Gazipur',
    permanentAddress: 'Vill: Kazipur, Sirajganj',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2022-07-22',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 7, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-76421',
    name: 'Mst. Khushi Khatun',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Ismail Hossain',
    motherName: 'Fatema Khatun',
    dob: '1999-06-19',
    mobile: '+880 1719-076421',
    email: 'khushi.76421@kojimalyric.com',
    nid: '19992692518076421',
    presentAddress: 'Ashulia, Savar, Dhaka',
    permanentAddress: 'Vill: Ishwardi, Pabna',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2022-09-05',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-76578',
    name: 'Mst. Bilkis Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Idris Ali',
    motherName: 'Rina Begum',
    dob: '1997-02-28',
    mobile: '+880 1820-076578',
    email: 'bilkis.76578@kojimalyric.com',
    nid: '19972692518076578',
    presentAddress: 'Baipal, Savar, Dhaka',
    permanentAddress: 'Vill: Gaibandha Sadar, Gaibandha',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2022-10-12',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-76794',
    name: 'Md. Manik Mia',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Siraj Mia',
    motherName: 'Sufia Begum',
    dob: '1994-11-15',
    mobile: '+880 1921-076794',
    email: 'manik.76794@kojimalyric.com',
    nid: '19942692518076794',
    presentAddress: 'Board Bazar, Gazipur',
    permanentAddress: 'Vill: Kurigram Sadar, Kurigram',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2022-11-20',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77021',
    name: 'Sumon Hawlader',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Late Amjad Hawlader',
    motherName: 'Anowara Begum',
    dob: '1996-05-08',
    mobile: '+880 1622-077021',
    email: 'sumon.77021@kojimalyric.com',
    nid: '19962692518077021',
    presentAddress: 'Gazipur Sadar, Gazipur',
    permanentAddress: 'Vill: Bakerganj, Barisal',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2023-01-05',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77271',
    name: 'Md. Sakib',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Moklesur Rahman',
    motherName: 'Parvin Akter',
    dob: '2001-03-24',
    mobile: '+880 1723-077271',
    email: 'sakib.77271@kojimalyric.com',
    nid: '20012692518077271',
    presentAddress: 'Tongi, Gazipur',
    permanentAddress: 'Vill: Nalchity, Jhalokathi',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2023-02-14',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77289',
    name: 'Md. Soroyar Hosen',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Delwar Hosen',
    motherName: 'Molina Begum',
    dob: '1995-09-12',
    mobile: '+880 1824-077289',
    email: 'soroyar.77289@kojimalyric.com',
    nid: '19952692518077289',
    presentAddress: 'Savar Bazar, Savar, Dhaka',
    permanentAddress: 'Vill: Nagarkanda, Faridpur',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2023-03-01',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77307',
    name: 'Afsana Khatun',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Ansar Ali',
    motherName: 'Aleya Begum',
    dob: '2000-01-05',
    mobile: '+880 1925-077307',
    email: 'afsana.77307@kojimalyric.com',
    nid: '20002692518077307',
    presentAddress: 'Chowrashta, Gazipur',
    permanentAddress: 'Vill: Shahjadpur, Sirajganj',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2023-03-10',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77329',
    name: 'Razia Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Joynal Abedin',
    motherName: 'Sahanara Begum',
    dob: '1996-10-19',
    mobile: '+880 1626-077329',
    email: 'razia.77329@kojimalyric.com',
    nid: '19962692518077329',
    presentAddress: 'Vogra Bypass, Gazipur',
    permanentAddress: 'Vill: Bhuapur, Tangail',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2023-03-22',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77380',
    name: 'Md.Roton Hossain',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Kamal Hossain',
    motherName: 'Rabea Khatun',
    dob: '1998-07-14',
    mobile: '+880 1727-077380',
    email: 'roton.77380@kojimalyric.com',
    nid: '19982692518077380',
    presentAddress: 'Baipal, Savar, Dhaka',
    permanentAddress: 'Vill: Shahrasti, Chandpur',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2023-04-05',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77385',
    name: 'Mrs. Sumi',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Shah Alam',
    motherName: 'Nurjahan Begum',
    dob: '1997-03-29',
    mobile: '+880 1828-077385',
    email: 'sumi.77385@kojimalyric.com',
    nid: '19972692518077385',
    presentAddress: 'Jamgora, Savar, Dhaka',
    permanentAddress: 'Vill: Laksham, Comilla',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2023-04-12',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-77403',
    name: 'Tahamina Begum',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Mofizul Islam',
    motherName: 'Saheda Begum',
    dob: '1999-12-01',
    mobile: '+880 1929-077403',
    email: 'tahamina.77403@kojimalyric.com',
    nid: '19992692518077403',
    presentAddress: 'Tongicross, Gazipur',
    permanentAddress: 'Vill: Derai, Sunamganj',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2023-04-20',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 10, casual: 6, sick: 12, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-82833',
    name: 'Mst. Nitu Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Ruhul Amin',
    motherName: 'Lipi Begum',
    dob: '2001-09-14',
    mobile: '+880 1630-082833',
    email: 'nitu.82833@kojimalyric.com',
    nid: '20012692518082833',
    presentAddress: 'Board Bazar, Gazipur',
    permanentAddress: 'Vill: Muktagacha, Mymensingh',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2024-01-15',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-83177',
    name: 'Md. Simon Ahammed Surzo',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Jahangir Surzo',
    motherName: 'Shahida Begum',
    dob: '2002-04-05',
    mobile: '+880 1731-083177',
    email: 'simon.83177@kojimalyric.com',
    nid: '20022692518083177',
    presentAddress: 'Sector 4, Uttara, Dhaka',
    permanentAddress: 'Vill: Phulpur, Mymensingh',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 01 (Jacket)',
    joiningDate: '2024-02-10',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-83841',
    name: 'Mst. Fatema',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Younus Ali',
    motherName: 'Rabeya Khatun',
    dob: '2000-11-20',
    mobile: '+880 1832-083841',
    email: 'fatema.83841@kojimalyric.com',
    nid: '20002692518083841',
    presentAddress: 'Chowrashta, Gazipur',
    permanentAddress: 'Vill: Domar, Nilphamari',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 02 (T-Shirt)',
    joiningDate: '2024-04-01',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84133',
    name: 'Happy Rani Das',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Subal Chandra Das',
    motherName: 'Gouri Rani Das',
    dob: '1999-08-16',
    mobile: '+880 1933-084133',
    email: 'happy.84133@kojimalyric.com',
    nid: '19992692518084133',
    presentAddress: 'Ashulia, Savar, Dhaka',
    permanentAddress: 'Vill: Baniachong, Habiganj',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 03 (Denim Pant)',
    joiningDate: '2024-05-15',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 11500,
    status: 'Active',
    otRate: 115,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84416',
    name: 'Md. Nurul Islam',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Sirajul Islam',
    motherName: 'Fulzan Begum',
    dob: '1996-02-10',
    mobile: '+880 1634-084416',
    email: 'nurul.84416@kojimalyric.com',
    nid: '19962692518084416',
    presentAddress: 'Gazipur Sadar, Gazipur',
    permanentAddress: 'Vill: Naria, Shariatpur',
    dept: 'Sewing',
    designation: 'Jr. M. Operator',
    section: 'Sewing Assembly',
    line: 'Production Line 04 (Knit Top)',
    joiningDate: '2024-06-20',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84172',
    name: 'Mst. Farzana Akter Jui',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Farhad Hossain',
    motherName: 'Jahanara Begum',
    dob: '2001-05-30',
    mobile: '+880 1735-084172',
    email: 'farzana.84172@kojimalyric.com',
    nid: '20012692518084172',
    presentAddress: 'Jamgora, Savar, Dhaka',
    permanentAddress: 'Vill: Kotalipara, Gopalganj',
    dept: 'Finishing & Packing',
    designation: 'Line Iron Man',
    section: 'Final Pressing & Ironing',
    line: 'Iron & Steam Line 1',
    joiningDate: '2024-05-20',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12500,
    status: 'Active',
    otRate: 125,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84210',
    name: 'Rotna Majumder',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Ratan Majumder',
    motherName: 'Shila Majumder',
    dob: '2000-07-12',
    mobile: '+880 1836-084210',
    email: 'rotna.84210@kojimalyric.com',
    nid: '20002692518084210',
    presentAddress: 'Baipal, Savar, Dhaka',
    permanentAddress: 'Vill: Swarupkati, Pirojpur',
    dept: 'Finishing & Packing',
    designation: 'Line Iron Man',
    section: 'Final Pressing & Ironing',
    line: 'Iron & Steam Line 1',
    joiningDate: '2024-05-28',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12500,
    status: 'Active',
    otRate: 125,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84381',
    name: 'Shila Biswas',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Sukumar Biswas',
    motherName: 'Anjali Biswas',
    dob: '1998-10-04',
    mobile: '+880 1937-084381',
    email: 'shila.84381@kojimalyric.com',
    nid: '19982692518084381',
    presentAddress: 'Tongicross, Gazipur',
    permanentAddress: 'Vill: Abhaynagar, Jessore',
    dept: 'Finishing & Packing',
    designation: 'Line Iron Man',
    section: 'Final Pressing & Ironing',
    line: 'Iron & Steam Line 1',
    joiningDate: '2024-06-10',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12500,
    status: 'Active',
    otRate: 125,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84433',
    name: 'Eashir',
    category: 'Worker',
    gender: 'Male',
    fatherName: 'Md. Soleman',
    motherName: 'Hasina Khatun',
    dob: '1997-12-18',
    mobile: '+880 1638-084433',
    email: 'eashir.84433@kojimalyric.com',
    nid: '19972692518084433',
    presentAddress: 'Board Bazar, Gazipur',
    permanentAddress: 'Vill: Kalia, Narail',
    dept: 'Finishing & Packing',
    designation: 'Line Iron Man',
    section: 'Final Pressing & Ironing',
    line: 'Iron & Steam Line 1',
    joiningDate: '2024-06-25',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12500,
    status: 'Active',
    otRate: 125,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 0 },
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'EMP-84621',
    name: 'Poly Akter',
    category: 'Worker',
    gender: 'Female',
    fatherName: 'Md. Rashid Miah',
    motherName: 'Monowara Begum',
    dob: '2001-01-22',
    mobile: '+880 1739-084621',
    email: 'poly.84621@kojimalyric.com',
    nid: '20012692518084621',
    presentAddress: 'Vogra Bypass, Gazipur',
    permanentAddress: 'Vill: Kendua, Netrokona',
    dept: 'Finishing & Packing',
    designation: 'Line Iron Man',
    section: 'Final Pressing & Ironing',
    line: 'Iron & Steam Line 1',
    joiningDate: '2024-07-08',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12500,
    status: 'Active',
    otRate: 125,
    leaveBalance: { annual: 8, casual: 5, sick: 10, maternity: 112 },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  }
];

const INITIAL_ATTENDANCE = [
  { id: 'ATT-1', empId: 'EMP-72623', empName: 'Mst. Nurunnahar Begum', dept: 'Sewing', line: 'Production Line 01 (Jacket)', date: '2026-11-07', checkIn: '06:52 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-2', empId: 'EMP-72685', empName: 'Mst. Rikta Begum', dept: 'Sewing', line: 'Production Line 01 (Jacket)', date: '2026-11-07', checkIn: '07:14 AM', checkOut: '05:30 PM', status: 'Late', otHours: 1.5 },
  { id: 'ATT-3', empId: 'EMP-73756', empName: 'Mst. Nipa Begum', dept: 'Sewing', line: 'Production Line 02 (T-Shirt)', date: '2026-11-07', checkIn: '06:55 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-4', empId: 'EMP-74088', empName: 'Mst. Masuma Akter', dept: 'Sewing', line: 'Production Line 02 (T-Shirt)', date: '2026-11-07', checkIn: '06:50 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-5', empId: 'EMP-74428', empName: 'Mst. Shahanaj Akter', dept: 'Sewing', line: 'Production Line 03 (Denim Pant)', date: '2026-11-07', checkIn: '-', checkOut: '-', status: 'On Leave', otHours: 0 },
  { id: 'ATT-6', empId: 'EMP-75520', empName: 'Mst. Sabana Begum', dept: 'Sewing', line: 'Production Line 03 (Denim Pant)', date: '2026-11-07', checkIn: '06:58 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-7', empId: 'EMP-75870', empName: 'Rikta Akter', dept: 'Sewing', line: 'Production Line 04 (Knit Top)', date: '2026-11-07', checkIn: '06:53 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-8', empId: 'EMP-84172', empName: 'Mst. Farzana Akter Jui', dept: 'Finishing & Packing', line: 'Iron & Steam Line 1', date: '2026-11-07', checkIn: '06:48 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-9', empId: 'EMP-84210', empName: 'Rotna Majumder', dept: 'Finishing & Packing', line: 'Iron & Steam Line 1', date: '2026-11-07', checkIn: '06:51 AM', checkOut: '05:30 PM', status: 'Present', otHours: 2.0 },
  { id: 'ATT-10', empId: 'EMP-84381', empName: 'Shila Biswas', dept: 'Finishing & Packing', line: 'Iron & Steam Line 1', date: '2026-11-07', checkIn: '-', checkOut: '-', status: 'Absent', otHours: 0 }
];

const INITIAL_LEAVES = [
  { id: 'LV-101', empId: 'EMP-74428', empName: 'Mst. Shahanaj Akter', dept: 'Sewing', type: 'Casual Leave', startDate: '2026-11-07', endDate: '2026-11-08', days: 2, reason: 'Family emergency / personal work', status: 'Approved', appliedOn: '2026-11-05' },
  { id: 'LV-102', empId: 'EMP-72623', empName: 'Mst. Nurunnahar Begum', dept: 'Sewing', type: 'Sick Leave', startDate: '2026-11-12', endDate: '2026-11-13', days: 2, reason: 'Fever and viral cold doctor consultation', status: 'Pending', appliedOn: '2026-11-06' },
  { id: 'LV-103', empId: 'EMP-84210', empName: 'Rotna Majumder', dept: 'Finishing & Packing', type: 'Annual Leave', startDate: '2026-11-20', endDate: '2026-11-25', days: 6, reason: 'Annual village visit', status: 'Pending', appliedOn: '2026-11-06' }
];

const INITIAL_RECRUITMENT = [
  { id: 'VAC-01', title: 'Jr. Machine Operator', dept: 'Sewing', line: 'Production Line 03', vacancies: 15, experience: '1-2 Years', status: 'Active', deadline: '2026-11-30', applicants: 34 },
  { id: 'VAC-02', title: 'Line Iron Man / Presser', dept: 'Finishing & Packing', line: 'Iron & Steam Line 1', vacancies: 5, experience: '1 Year', status: 'Active', deadline: '2026-11-25', applicants: 12 },
  { id: 'VAC-03', title: 'Quality Assurance Inspector', dept: 'Quality Control (QC)', line: 'N/A', vacancies: 3, experience: '2 Years', status: 'Interviewing', deadline: '2026-11-15', applicants: 8 }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-901', time: '2026-11-07 08:30 AM', user: 'HR Admin (Ayesha)', action: 'APPROVED_LEAVE', detail: 'Approved Casual leave for EMP-74428 Mst. Shahanaj Akter' },
  { id: 'LOG-902', time: '2026-11-07 07:15 AM', user: 'System Roster', action: 'ATTENDANCE_GEN', detail: 'Daily Attendance Register initialized for 2026-11-07' },
  { id: 'LOG-903', time: '2026-11-06 04:45 PM', user: 'Accounts Mgr (Mahmud)', action: 'PAYROLL_PROCESSED', detail: 'Monthly Salary Sheet for October 2026 calculated & locked' }
];

export default function App() {
  // --- GLOBAL STATE WITH LOCALSTORAGE PERSISTENCE ---
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('hrms_role') || 'Admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('hrms_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('hrms_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [lines, setLines] = useState(() => {
    const saved = localStorage.getItem('hrms_lines');
    return saved ? JSON.parse(saved) : INITIAL_LINES;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('hrms_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('hrms_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [vacancies, setVacancies] = useState(() => {
    const saved = localStorage.getItem('hrms_vacancies');
    return saved ? JSON.parse(saved) : INITIAL_RECRUITMENT;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('hrms_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // UI state filters & modals
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showEmpModal, setShowEmpModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(null);
  const [showPrintBioModal, setShowPrintBioModal] = useState(null);

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('hrms_role', currentRole); }, [currentRole]);
  useEffect(() => { localStorage.setItem('hrms_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('hrms_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('hrms_lines', JSON.stringify(lines)); }, [lines]);
  useEffect(() => { localStorage.setItem('hrms_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('hrms_leaves', JSON.stringify(leaves)); }, [leaves]);
  useEffect(() => { localStorage.setItem('hrms_vacancies', JSON.stringify(vacancies)); }, [vacancies]);
  useEffect(() => { localStorage.setItem('hrms_logs', JSON.stringify(auditLogs)); }, [auditLogs]);

  const addAuditLog = (action, detail) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleString(),
      user: `${currentRole} User`,
      action,
      detail
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Helper Stats Calculation
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'Active').length;
    const inactive = total - active;
    
    const todayAtt = attendance.filter(a => a.date === '2026-11-07');
    const present = todayAtt.filter(a => a.status === 'Present').length;
    const late = todayAtt.filter(a => a.status === 'Late').length;
    const onLeave = todayAtt.filter(a => a.status === 'On Leave').length;
    const absent = todayAtt.filter(a => a.status === 'Absent').length;

    const totalPayroll = employees.reduce((acc, curr) => {
      // Basic + HR (50%) + Medical ($150) + Transport ($100) + Food ($100)
      const allowances = (curr.basicSalary * 0.50) + 1500 + 1000 + 1000;
      return acc + (curr.basicSalary + allowances);
    }, 0);

    return { total, active, inactive, present, late, onLeave, absent, totalDepts: departments.length, totalPayroll };
  }, [employees, attendance, departments]);

  // Handle Employee Form Submit
  const handleSaveEmployee = (e, formData) => {
    e.preventDefault();
    if (currentRole === 'Viewer') {
      alert('Viewers have read-only permissions.');
      return;
    }

    if (formData.id) {
      // Edit
      setEmployees(prev => prev.map(emp => emp.id === formData.id ? { ...formData } : emp));
      addAuditLog('EDIT_EMPLOYEE', `Updated profile details for ${formData.name} (${formData.id})`);
    } else {
      // Create
      const newId = `EMP-${1000 + employees.length + 1}`;
      const newEmp = {
        ...formData,
        id: newId,
        avatar: formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
        leaveBalance: { annual: 12, casual: 10, sick: 14, maternity: formData.gender === 'Female' ? 112 : 0 }
      };
      setEmployees(prev => [...prev, newEmp]);
      // create initial attendance entry
      setAttendance(prev => [...prev, {
        id: `ATT-${Date.now()}`,
        empId: newId,
        empName: newEmp.name,
        dept: newEmp.dept,
        line: newEmp.line,
        date: '2026-11-07',
        checkIn: '07:00 AM',
        checkOut: '05:30 PM',
        status: 'Present',
        otHours: 1.5
      }]);
      addAuditLog('CREATE_EMPLOYEE', `Added new garment employee ${newEmp.name} (${newId}) in line ${newEmp.line}`);
    }
    setShowEmpModal(false);
  };

  const handleDeleteEmployee = (id, name) => {
    if (currentRole === 'Viewer') {
      alert('Viewers cannot delete records.');
      return;
    }
    if (window.confirm(`Are you sure you want to terminate/delete employee record ${name} (${id})?`)) {
      setEmployees(prev => prev.filter(e => e.id !== id));
      addAuditLog('DELETE_EMPLOYEE', `Deleted employee record for ${name} (${id})`);
    }
  };

  const handleLeaveAction = (leaveId, status) => {
    if (currentRole === 'Viewer') {
      alert('Viewers cannot approve/reject leave requests.');
      return;
    }
    setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status } : l));
    addAuditLog('LEAVE_DECISION', `Updated Leave #${leaveId} status to ${status}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* TOP NAV BAR */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 border-b border-slate-800 shadow-md">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition"
              title="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-[#3a86ff] p-1.5 rounded-lg text-white font-extrabold text-xs tracking-wider uppercase shadow-sm">
                KLG
              </div>
              <div>
                <h1 className="font-bold text-base leading-none text-white tracking-wide">Kojima Lyric Garments Ltd</h1>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">Enterprise HRMS & Line Floor Operations</span>
              </div>
            </div>
          </div>

          {/* GLOBAL SEARCH & TOP CONTROLS */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search worker ID, name, line..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 text-xs text-white placeholder-slate-400 pl-9 pr-3 py-2 rounded-md border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* NOTIFICATIONS DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-300 relative transition"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 z-50 text-xs py-2">
                  <div className="px-3 py-1.5 font-bold border-b border-slate-100 flex justify-between items-center text-slate-700">
                    <span>Notifications</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-semibold">3 New</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-700">Pending Leave Request</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Md. Ariful Islam requested 2 days Sick Leave.</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-700">Line 01 OT Approved</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">2.0 Hours evening OT logged for Sewing Line 01.</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROLE SWITCHER DROPDOWN */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
              <ShieldCheck className="text-blue-400 hidden sm:block" size={18} />
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-medium">ACTIVE ROLE</span>
                <select
                  value={currentRole}
                  onChange={(e) => {
                    setCurrentRole(e.target.value);
                    addAuditLog('ROLE_SWITCH', `Switched active role to ${e.target.value}`);
                  }}
                  className="bg-slate-800 text-white font-semibold text-xs border border-slate-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Admin">Admin (Full Access)</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="HR Executive">HR Executive</option>
                  <option value="Accounts Manager">Accounts Manager</option>
                  <option value="Department Manager">Department Manager</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>
            </div>

            {/* USER PROFILE */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="User"
                className="w-8 h-8 rounded-full border border-blue-500 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-16'
          } bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-200 flex flex-col shrink-0 select-none`}
        >
          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            <NavItem 
              icon={<TrendingUp size={18} />} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Users size={18} />} 
              label="Employee Directory" 
              active={activeTab === 'employees'} 
              onClick={() => setActiveTab('employees')} 
              collapsed={!sidebarOpen}
              badge={employees.length}
            />
            <NavItem 
              icon={<Building2 size={18} />} 
              label="Depts & Production Lines" 
              active={activeTab === 'departments'} 
              onClick={() => setActiveTab('departments')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Clock size={18} />} 
              label="Attendance & OT Roster" 
              active={activeTab === 'attendance'} 
              onClick={() => setActiveTab('attendance')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Calendar size={18} />} 
              label="Leave Approvals" 
              active={activeTab === 'leaves'} 
              onClick={() => setActiveTab('leaves')} 
              collapsed={!sidebarOpen}
              badge={leaves.filter(l => l.status === 'Pending').length}
              badgeColor="bg-amber-500 text-slate-900"
            />
            <NavItem 
              icon={<DollarSign size={18} />} 
              label="Garments Payroll Engine" 
              active={activeTab === 'payroll'} 
              onClick={() => setActiveTab('payroll')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Briefcase size={18} />} 
              label="Recruitment & Hiring" 
              active={activeTab === 'recruitment'} 
              onClick={() => setActiveTab('recruitment')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<FileText size={18} />} 
              label="Document Vault" 
              active={activeTab === 'documents'} 
              onClick={() => setActiveTab('documents')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Award size={18} />} 
              label="Line KPI & Performance" 
              active={activeTab === 'performance'} 
              onClick={() => setActiveTab('performance')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Layers size={18} />} 
              label="Reports & Analytics" 
              active={activeTab === 'reports'} 
              onClick={() => setActiveTab('reports')} 
              collapsed={!sidebarOpen} 
            />
            <NavItem 
              icon={<Settings size={18} />} 
              label="System & Audit Logs" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
              collapsed={!sidebarOpen} 
            />
          </div>

          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500">
            {sidebarOpen ? (
              <div>
                <p className="font-semibold text-slate-400">Garment Compliance v4.2</p>
                <p>BSCI & ILO Standard Ready</p>
              </div>
            ) : (
              <span className="text-center block">v4.2</span>
            )}
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {/* SEARCH HIGHLIGHT NOTICE IF ACTIVE SEARCH */}
          {searchTerm && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg flex items-center justify-between text-xs">
              <span>Filtering views for search term: <strong>"{searchTerm}"</strong></span>
              <button onClick={() => setSearchTerm('')} className="text-blue-600 underline font-semibold">Clear Search</button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <DashboardView 
              stats={stats} 
              employees={employees} 
              attendance={attendance} 
              auditLogs={auditLogs}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'employees' && (
            <EmployeeDirectoryView 
              employees={employees} 
              departments={departments}
              lines={lines}
              searchTerm={searchTerm}
              currentRole={currentRole}
              onOpenAddModal={() => setShowEmpModal(true)}
              onSelectEmp={(emp) => setSelectedEmp(emp)}
              onDeleteEmp={handleDeleteEmployee}
              onPrintBio={(emp) => setShowPrintBioModal(emp)}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsView 
              departments={departments} 
              lines={lines} 
              setDepartments={setDepartments}
              setLines={setLines}
              currentRole={currentRole}
              addAuditLog={addAuditLog}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView 
              attendance={attendance} 
              setAttendance={setAttendance}
              employees={employees}
              currentRole={currentRole}
              addAuditLog={addAuditLog}
            />
          )}

          {activeTab === 'leaves' && (
            <LeaveManagementView 
              leaves={leaves} 
              onAction={handleLeaveAction}
              employees={employees}
              onApplyClick={() => setShowLeaveModal(true)}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'payroll' && (
            <PayrollView 
              employees={employees} 
              attendance={attendance} 
              onViewPayslip={(emp) => setShowPayslipModal(emp)}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'recruitment' && (
            <RecruitmentView 
              vacancies={vacancies} 
              setVacancies={setVacancies}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView employees={employees} />
          )}

          {activeTab === 'performance' && (
            <PerformanceView employees={employees} lines={lines} />
          )}

          {activeTab === 'reports' && (
            <ReportsView employees={employees} attendance={attendance} departments={departments} />
          )}

          {activeTab === 'settings' && (
            <SettingsView auditLogs={auditLogs} currentRole={currentRole} />
          )}
        </main>
      </div>

      {/* --- MODALS SECTION --- */}

      {/* ADD/EDIT EMPLOYEE MODAL */}
      {showEmpModal && (
        <EmployeeFormModal 
          onClose={() => setShowEmpModal(false)}
          onSave={handleSaveEmployee}
          departments={departments}
          lines={lines}
        />
      )}

      {/* EMPLOYEE PROFILE DETAIL MODAL */}
      {selectedEmp && (
        <EmployeeDetailModal 
          emp={selectedEmp} 
          onClose={() => setSelectedEmp(null)}
          onPrint={() => setShowPrintBioModal(selectedEmp)}
        />
      )}

      {/* PAYSLIP MODAL */}
      {showPayslipModal && (
        <PayslipModal 
          emp={showPayslipModal} 
          attendance={attendance.filter(a => a.empId === showPayslipModal.id)}
          onClose={() => setShowPayslipModal(null)} 
        />
      )}

      {/* PRINT BIO & ID CARD MODAL */}
      {showPrintBioModal && (
        <PrintBioModal 
          emp={showPrintBioModal} 
          onClose={() => setShowPrintBioModal(null)} 
        />
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS & DASHBOARD MODULES
// ==========================================

function NavItem({ icon, label, active, onClick, collapsed, badge, badgeColor }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
        active 
          ? 'bg-blue-600 text-white font-semibold shadow-sm' 
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
      title={collapsed ? label : ''}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="truncate flex-1 text-left">{label}</span>}
      {!collapsed && badge !== undefined && (
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${badgeColor || 'bg-slate-800 text-slate-300'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// --- 1. DASHBOARD VIEW ---
function DashboardView({ stats, employees, attendance, auditLogs, setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 rounded-xl text-white shadow-lg border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-[#3a86ff]/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-[#3a86ff]/40">
            Kojima Lyric Shift A - Operational
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Kojima Lyric Operations & HR Dashboard</h2>
          <p className="text-slate-300 text-xs mt-1">Real-time floor worker tracking, line capacity breakdown & monthly payroll stats.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('employees')} 
            className="bg-[#3a86ff] hover:bg-blue-600 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition shadow flex items-center gap-1.5"
          >
            <UserPlus size={15} /> Add Employee
          </button>
          <button 
            onClick={() => setActiveTab('payroll')} 
            className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition border border-slate-600 flex items-center gap-1.5"
          >
            <DollarSign size={15} /> Run Payroll
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Employees</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{stats.total}</h3>
            <span className="text-[10px] text-emerald-600 font-semibold">{stats.active} Floor Active</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Present Today</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{stats.present}</h3>
            <span className="text-[10px] text-amber-600 font-semibold">{stats.late} Arrived Late</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">On Leave / Absent</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{stats.onLeave + stats.absent}</h3>
            <span className="text-[10px] text-rose-600 font-semibold">{stats.absent} Unexcused</span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
            <UserX size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Est. Monthly Wage</span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">৳{stats.totalPayroll.toLocaleString()}</h3>
            <span className="text-[10px] text-slate-400 font-medium">Basic + Allowances</span>
          </div>
          <div className="p-3 bg-violet-50 text-violet-600 rounded-lg">
            <DollarSign size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. EMPLOYEE DIRECTORY MODULE ---
function EmployeeDirectoryView({ employees, departments, lines, searchTerm, currentRole, onOpenAddModal, onSelectEmp, onDeleteEmp, onPrintBio }) {
  const [deptFilter, setDeptFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredEmps = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.line.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'All' || emp.dept === deptFilter;
      const matchesType = typeFilter === 'All' || emp.category === typeFilter;
      return matchesSearch && matchesDept && matchesType;
    });
  }, [employees, searchTerm, deptFilter, typeFilter]);

  return (
    <div className="space-y-4">
      {/* FILTER & ACTIONS BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Staff/Worker Categories</option>
            <option value="Worker">Workers (Operators & Helpers)</option>
            <option value="Staff">Staff (Executive & Admin)</option>
          </select>
        </div>

        {currentRole !== 'Viewer' && (
          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-lg font-semibold shadow transition flex items-center gap-1.5"
          >
            <Plus size={16} /> Register New Employee
          </button>
        )}
      </div>

      {/* EMPLOYEE TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Employee Details</th>
                <th className="p-3">Dept & Designation</th>
                <th className="p-3">Assigned Line</th>
                <th className="p-3">Shift & Category</th>
                <th className="p-3">Basic Pay</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmps.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="font-bold text-slate-900 block">{emp.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{emp.id} • {emp.mobile}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-800 block">{emp.designation}</span>
                    <span className="text-slate-500">{emp.dept}</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">
                      {emp.line}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="block text-slate-700">{emp.shift}</span>
                    <span className="text-[10px] text-blue-600 font-semibold uppercase">{emp.category}</span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-800">
                    ৳{emp.basicSalary.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => onSelectEmp(emp)} 
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded"
                        title="View Full Profile"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        onClick={() => onPrintBio(emp)} 
                        className="p-1.5 text-slate-600 hover:text-purple-600 hover:bg-slate-100 rounded"
                        title="Print Factory ID Pass"
                      >
                        <Printer size={15} />
                      </button>
                      {currentRole !== 'Viewer' && (
                        <button 
                          onClick={() => onDeleteEmp(emp.id, emp.name)} 
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded"
                          title="Terminate / Delete Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 3. DEPARTMENTS & LINES MODULE ---
function DepartmentsView({ departments, lines, setDepartments, setLines, currentRole, addAuditLog }) {
  const [newDeptName, setNewDeptName] = useState('');
  const [newLineName, setNewLineName] = useState('');

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDeptName) return;
    const newDept = {
      id: `DEP-0${departments.length + 1}`,
      name: newDeptName,
      head: 'TBD Supervisor',
      code: newDeptName.slice(0, 3).toUpperCase(),
      lineCount: 0,
      empCount: 0
    };
    setDepartments(prev => [...prev, newDept]);
    addAuditLog('ADD_DEPT', `Created Department ${newDeptName}`);
    setNewDeptName('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DEPARTMENTS CARD */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Garment Factory Departments</h3>
            <span className="text-xs text-slate-500 font-medium">{departments.length} Units</span>
          </div>

          {currentRole !== 'Viewer' && (
            <form onSubmit={handleAddDept} className="flex gap-2">
              <input
                type="text"
                placeholder="New Dept Name..."
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800"
              />
              <button type="submit" className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-blue-500">
                + Add Dept
              </button>
            </form>
          )}

          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {departments.map(d => (
              <div key={d.id} className="py-2.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">{d.name}</span>
                  <span className="text-slate-400 font-mono text-[11px]">Head: {d.head}</span>
                </div>
                <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                  {d.empCount} Staff/Workers
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTION LINES CARD */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">Active Production Lines</h3>
            <span className="text-xs text-slate-500 font-medium">{lines.length} Lines</span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {lines.map(l => (
              <div key={l.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">{l.name}</span>
                  <span className="text-slate-500">Supervisor: <strong>{l.supervisor}</strong></span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-600 block">{l.currentHeadcount} Operators</span>
                  <span className="text-[10px] text-slate-400">Target: {l.targetQty} pcs/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. ATTENDANCE & OT ROSTER MODULE ---
function AttendanceView({ attendance, setAttendance, employees, currentRole, addAuditLog }) {
  const toggleAttendanceStatus = (id) => {
    if (currentRole === 'Viewer') return;
    setAttendance(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'Present' ? 'Late' : a.status === 'Late' ? 'Absent' : 'Present';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
    addAuditLog('ATTENDANCE_UPDATE', `Manually toggled attendance status for log #${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Kojima Lyric Daily Shift Attendance & Overtime Register</h2>
          <p className="text-xs text-slate-500">Date: <strong>07 November 2026 (Shift Morning)</strong></p>
        </div>

        {currentRole !== 'Viewer' && (
          <button 
            onClick={() => alert('Attendance log synced with RFID Smart Gate Readers.')}
            className="bg-emerald-600 text-white text-xs px-3.5 py-2 rounded-lg font-semibold hover:bg-emerald-500 flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Sync RFID Readers
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Worker ID & Name</th>
                <th className="p-3">Line / Dept</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3">Overtime (OT)</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Cycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance.map(att => (
                <tr key={att.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    {att.empName}
                    <span className="block text-[10px] text-slate-400 font-mono font-normal">{att.empId}</span>
                  </td>
                  <td className="p-3 text-slate-600">{att.line}</td>
                  <td className="p-3 font-mono text-slate-700">{att.checkIn}</td>
                  <td className="p-3 font-mono text-slate-700">{att.checkOut}</td>
                  <td className="p-3 font-mono font-bold text-blue-600">
                    {att.otHours > 0 ? `${att.otHours} hrs` : '-'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      att.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                      att.status === 'Late' ? 'bg-amber-100 text-amber-800' :
                      att.status === 'On Leave' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {att.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {currentRole !== 'Viewer' && (
                      <button
                        onClick={() => toggleAttendanceStatus(att.id)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded border border-slate-300"
                      >
                        Toggle Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 5. LEAVE MANAGEMENT MODULE ---
function LeaveManagementView({ leaves, onAction, employees, onApplyClick, currentRole }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-800">Kojima Lyric Worker Leave Approvals & Balance</h2>
          <p className="text-xs text-slate-500">Review maternity, annual, and casual leave applications.</p>
        </div>

        {currentRole !== 'Viewer' && (
          <button 
            onClick={onApplyClick}
            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-500"
          >
            + Apply Leave
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Leave Type</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map(l => (
                <tr key={l.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    {l.empName}
                    <span className="block text-[10px] text-slate-400 font-normal">{l.dept}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{l.type}</td>
                  <td className="p-3 text-slate-600">
                    {l.startDate} to {l.endDate} ({l.days} days)
                  </td>
                  <td className="p-3 text-slate-500 max-w-xs truncate">{l.reason}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      l.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {l.status === 'Pending' && currentRole !== 'Viewer' && (
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => onAction(l.id, 'Approved')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => onAction(l.id, 'Rejected')}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 6. GARMENTS PAYROLL ENGINE ---
function PayrollView({ employees, attendance, onViewPayslip, currentRole }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-800">Kojima Lyric Garments Payroll Engine</h2>
          <p className="text-xs text-slate-500">Wage Structure: Basic Pay (60%) + House Rent (30%) + Allowances (10%) + OT Pay + Attendance Bonus - Deductions</p>
        </div>

        <button 
          onClick={() => alert('Payroll calculated for Kojima Lyric Garments Ltd.')}
          className="bg-teal-600 hover:bg-teal-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold shadow flex items-center gap-1.5"
        >
          <RefreshCw size={14} /> Process Month Salary
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Basic (60%)</th>
                <th className="p-3">House Rent (30%)</th>
                <th className="p-3">Allowances (10%)</th>
                <th className="p-3">OT Payment</th>
                <th className="p-3">Gross Salary</th>
                <th className="p-3">Deductions</th>
                <th className="p-3">Net Payable</th>
                <th className="p-3 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => {
                const basicWage = emp.basicSalary * 0.60;
                const houseRent = emp.basicSalary * 0.30;
                const allowances = emp.basicSalary * 0.10;
                const otPayment = (emp.otRate || 0) * 12; // Example 12 hrs OT
                const gross = basicWage + houseRent + allowances + otPayment;
                const deductions = 500; // Standard provident/absent deduction
                const netPay = gross - deductions;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-semibold text-slate-900">
                      {emp.name}
                      <span className="block text-[10px] text-slate-400 font-mono font-normal">{emp.id}</span>
                    </td>
                    <td className="p-3 font-mono">৳{basicWage.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-600">৳{houseRent.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-600">৳{allowances.toLocaleString()}</td>
                    <td className="p-3 font-mono text-[#3a86ff] font-semibold">৳{otPayment.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">৳{gross.toLocaleString()}</td>
                    <td className="p-3 font-mono text-rose-600">-৳{deductions.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/50">৳{netPay.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => onViewPayslip(emp)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-200"
                      >
                        Payslip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 7. RECRUITMENT & TALENT ACQUISITION ---
function RecruitmentView({ vacancies, setVacancies, currentRole }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-800">Recruitment & Garment Worker Hiring</h2>
          <p className="text-xs text-slate-500">Manage vacancies for machine operators, floor supervisors & merchandisers.</p>
        </div>

        {currentRole !== 'Viewer' && (
          <button 
            onClick={() => alert('Add job vacancy form dialog opened.')}
            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-500"
          >
            + Post Vacancy
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vacancies.map(vac => (
          <div key={vac.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-900 text-sm">{vac.title}</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {vac.vacancies} Positions
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">Department: <strong className="text-slate-700">{vac.dept}</strong></p>
              <p className="text-xs text-slate-500 mb-3">Req. Experience: {vac.experience}</p>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
              <span className="text-slate-500">Applicants: <strong className="text-slate-800">{vac.applicants}</strong></span>
              <span className="text-emerald-600 font-semibold">{vac.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 8. DOCUMENT VAULT ---
function DocumentsView({ employees }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-800">Employee Compliance Document Vault</h2>
        <p className="text-xs text-slate-500">Store National NID cards, Joining Agreements & Medical fitness certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {employees.map(emp => (
          <div key={emp.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={18} />
              <div>
                <span className="font-bold text-slate-800 block">{emp.name}</span>
                <span className="text-[10px] text-slate-400">NID: {emp.nid}</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-100">
              <div className="flex justify-between"><span>NID Card Copy:</span> <span className="text-emerald-600 font-bold">Uploaded</span></div>
              <div className="flex justify-between"><span>Appointment Letter:</span> <span className="text-emerald-600 font-bold">Signed</span></div>
              <div className="flex justify-between"><span>Medical Fitness Certificate:</span> <span className="text-emerald-600 font-bold">Verified</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 9. PERFORMANCE & LINE KPI ---
function PerformanceView({ employees, lines }) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Garment Line Efficiency & Individual KPIs</h2>
        <p className="text-xs text-slate-500 mb-4">Target vs actual operator hourly output ratings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employees.map(emp => (
            <div key={emp.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{emp.name}</span>
                <span className="text-slate-500">{emp.designation} • {emp.line}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-600 block">94.5%</span>
                <span className="text-[10px] text-slate-400 uppercase">Efficiency Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 10. REPORTS & ANALYTICS ---
function ReportsView({ employees, attendance, departments }) {
  const downloadCSV = () => {
    const headers = "Employee ID,Name,Department,Designation,Basic Salary,Status\n";
    const rows = employees.map(e => `"${e.id}","${e.name}","${e.dept}","${e.designation}",${e.basicSalary},"${e.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kojima_Lyric_Master_Employee_Report_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-slate-800">Kojima Lyric Compliance & Master Reports</h2>
          <p className="text-xs text-slate-500">Export audit-ready CSV & printable employee records for BGMEA compliance.</p>
        </div>
        <button 
          onClick={downloadCSV}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold shadow flex items-center gap-1.5"
        >
          <Download size={15} /> Export Master CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Monthly Attendance & OT Report</h4>
            <p className="text-slate-500">Complete summary of floor hours & overtime payments per worker.</p>
          </div>
          <button onClick={() => window.print()} className="mt-4 text-blue-600 font-semibold underline text-left">Generate & Print</button>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Salary & Allowance Disbursal Sheet</h4>
            <p className="text-slate-500">Bank transfer list & cash wage sheet format.</p>
          </div>
          <button onClick={() => window.print()} className="mt-4 text-blue-600 font-semibold underline text-left">Generate & Print</button>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Worker Turnover & Joining Report</h4>
            <p className="text-slate-500">New joiners and exit interviews analysis for BGMEA audit.</p>
          </div>
          <button onClick={() => window.print()} className="mt-4 text-blue-600 font-semibold underline text-left">Generate & Print</button>
        </div>
      </div>
    </div>
  );
}

// --- 11. SYSTEM & AUDIT LOGS VIEW ---
function SettingsView({ auditLogs, currentRole }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Kojima Lyric Garments Ltd - Factory Settings</h2>
        <p className="text-xs text-slate-500 mb-4">Configuration for shifts, standard overtime multiplier, and factory parameters.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Company Name</label>
            <input type="text" readOnly value="Kojima Lyric Garments Ltd" className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-1.5 text-slate-800 font-semibold" />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Default OT Multiplier Rate</label>
            <input type="text" readOnly value="2.0x Basic Hourly Rate" className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-1.5 text-slate-800" />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Activity size={16} className="text-blue-600" /> Audit Log & System Activity Trail
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="p-2.5">Time Stamp</th>
                <th className="p-2.5">User Role</th>
                <th className="p-2.5">Action Code</th>
                <th className="p-2.5">Detail Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td className="p-2.5 text-slate-400">{log.time}</td>
                  <td className="p-2.5 font-bold text-blue-700">{log.user}</td>
                  <td className="p-2.5 font-semibold text-slate-800">{log.action}</td>
                  <td className="p-2.5 text-slate-600">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODAL DIALOG COMPONENTS
// ==========================================

function EmployeeFormModal({ onClose, onSave, departments, lines }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Worker',
    gender: 'Male',
    fatherName: '',
    motherName: '',
    dob: '1995-01-01',
    mobile: '+880 1700-000000',
    email: '',
    nid: '',
    presentAddress: '',
    permanentAddress: '',
    dept: departments[0]?.name || 'Sewing',
    designation: 'Sewing Operator',
    section: 'Sewing Assembly',
    line: lines[0]?.name || 'Production Line 01',
    joiningDate: '2026-01-01',
    employmentType: 'Permanent',
    shift: 'Morning (07:00 - 15:30)',
    basicSalary: 12000,
    status: 'Active',
    otRate: 120
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-sm">Add New Garment Employee / Worker</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={(e) => onSave(e, formData)} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Employee Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Md. Jasim Uddin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              >
                <option value="Worker">Worker (Direct Operator)</option>
                <option value="Staff">Staff (Executive / Admin)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={formData.dept}
                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              >
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Production Line Assignment</label>
              <select
                value={formData.line}
                onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              >
                {lines.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designation</label>
              <input
                type="text"
                placeholder="e.g. Junior Sewing Operator"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Basic Salary (BDT)</label>
              <input
                type="number"
                required
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">National NID Number</label>
              <input
                type="text"
                placeholder="19-digit NID string"
                value={formData.nid}
                onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500">
              Save Employee Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EmployeeDetailModal({ emp, onClose, onPrint }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-sm">Garment Employee Full Bio Profile</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <img src={emp.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover" />
            <div>
              <h2 className="text-base font-bold text-slate-900">{emp.name}</h2>
              <span className="text-slate-500 block font-mono">{emp.id} • {emp.designation}</span>
              <span className="inline-block mt-1 bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                {emp.dept} | {emp.line}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-700">
            <div><strong>Father's Name:</strong> {emp.fatherName}</div>
            <div><strong>Mother's Name:</strong> {emp.motherName}</div>
            <div><strong>Date of Birth:</strong> {emp.dob}</div>
            <div><strong>National NID:</strong> {emp.nid}</div>
            <div><strong>Contact Mobile:</strong> {emp.mobile}</div>
            <div><strong>Shift Assigned:</strong> {emp.shift}</div>
            <div><strong>Basic Pay:</strong> ৳{emp.basicSalary.toLocaleString()}</div>
            <div><strong>OT Rate:</strong> ৳{emp.otRate}/hr</div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">Present Address</span>
            <p className="text-slate-600">{emp.presentAddress}</p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button 
              onClick={() => onPrint(emp)}
              className="bg-slate-800 text-white font-bold px-3 py-1.5 rounded flex items-center gap-1.5"
            >
              <Printer size={15} /> Print Factory ID & Bio Sheet
            </button>
            <button onClick={onClose} className="text-slate-500 font-semibold underline">Close Window</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayslipModal({ emp, attendance, onClose }) {
  const basicWage = emp.basicSalary * 0.60;
  const houseRent = emp.basicSalary * 0.30;
  const allowances = emp.basicSalary * 0.10;
  const otPayment = (emp.otRate || 0) * 12;
  const gross = basicWage + houseRent + allowances + otPayment;
  const deductions = 500;
  const netPay = gross - deductions;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 text-slate-800 text-xs">
        <div className="text-center border-b border-slate-200 pb-3 mb-4">
          <h2 className="font-bold text-base text-slate-900 tracking-wide">KOJIMA LYRIC GARMENTS LTD</h2>
          <p className="text-slate-500 text-[11px]">Factory Wage & Payslip Statement - November 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-3 rounded border border-slate-200">
          <div>Worker ID: <strong className="text-slate-900">{emp.id}</strong></div>
          <div>Name: <strong className="text-slate-900">{emp.name}</strong></div>
          <div>Department: <strong>{emp.dept}</strong></div>
          <div>Line: <strong>{emp.line}</strong></div>
        </div>

        <div className="space-y-2 border-b border-slate-200 pb-4">
          <div className="flex justify-between"><span>Basic Wages (60%):</span> <span className="font-mono">৳{basicWage.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>House Rent (30%):</span> <span className="font-mono">৳{houseRent.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Transport & Medical Allowance (10%):</span> <span className="font-mono">৳{allowances.toLocaleString()}</span></div>
          <div className="flex justify-between text-[#3a86ff] font-semibold"><span>Overtime Wage (12 Hrs):</span> <span className="font-mono">৳{otPayment.toLocaleString()}</span></div>
          <div className="flex justify-between text-rose-600"><span>Absentee/Tax Deductions:</span> <span className="font-mono">-৳{deductions.toLocaleString()}</span></div>
        </div>

        <div className="flex justify-between text-sm font-bold pt-3 text-slate-900">
          <span>Net Salary Payable:</span>
          <span className="text-emerald-700 font-mono">৳{netPay.toLocaleString()}</span>
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button onClick={() => window.print()} className="bg-[#3a86ff] hover:bg-blue-600 text-white font-bold px-4 py-2 rounded flex-1">Print Payslip</button>
          <button onClick={onClose} className="border border-slate-300 px-4 py-2 rounded text-slate-700">Close</button>
        </div>
      </div>
    </div>
  );
}

function PrintBioModal({ emp, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6 text-slate-800 text-xs">
        <div className="text-center mb-4">
          <h3 className="font-bold text-sm text-slate-900">Kojima Lyric ID Pass Preview</h3>
          <p className="text-slate-400 text-[10px]">Ready for PVC Thermal Printer</p>
        </div>

        {/* FACTORY ID CARD PREVIEW */}
        <div className="border-2 border-slate-800 rounded-xl p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white shadow-xl max-w-xs mx-auto text-center space-y-3">
          <div className="border-b border-[#3a86ff]/40 pb-2">
            <h4 className="font-extrabold text-sm tracking-wider uppercase text-[#3a86ff]">Kojima Lyric Garments</h4>
            <span className="text-[9px] text-slate-300">AUTHORIZED WORKER PASS</span>
          </div>

          <img src={emp.avatar} alt="" className="w-20 h-20 rounded-lg mx-auto object-cover border-2 border-[#3a86ff]" />

          <div>
            <h3 className="font-bold text-base text-white">{emp.name}</h3>
            <span className="text-blue-300 font-mono text-xs font-semibold">{emp.id}</span>
          </div>

          <div className="text-[10px] text-slate-300 space-y-0.5 bg-slate-800/80 p-2 rounded">
            <div>Dept: <strong>{emp.dept}</strong></div>
            <div>Desig: <strong>{emp.designation}</strong></div>
            <div>Line: <strong>{emp.line}</strong></div>
          </div>

          <div className="pt-2 text-[8px] text-slate-400 border-t border-slate-800">
            If found, return to HR Dept, Kojima Lyric Garments Ltd.
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={() => window.print()} className="bg-slate-900 text-white font-bold px-4 py-2 rounded flex-1">Print Pass</button>
          <button onClick={onClose} className="border border-slate-300 px-4 py-2 rounded text-slate-700">Close</button>
        </div>
      </div>
    </div>
  );
}