-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2019 at 03:59 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `informationsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement_table`
--

CREATE TABLE `announcement_table` (
  `atid` int(11) NOT NULL,
  `ann_post` varchar(400) NOT NULL,
  `ann_time` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `enrollsubject_table`
--

CREATE TABLE `enrollsubject_table` (
  `esid` int(11) NOT NULL,
  `enroll_studno` varchar(25) NOT NULL,
  `enroll_fullname` varchar(50) NOT NULL,
  `enroll_subjcode` varchar(15) NOT NULL,
  `enroll_sem` varchar(20) NOT NULL,
  `enroll_schooly` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gradelevel_table`
--

CREATE TABLE `gradelevel_table` (
  `gid` int(11) NOT NULL,
  `level_name` varchar(50) NOT NULL,
  `level_code` varchar(5) NOT NULL,
  `level_term` varchar(20) NOT NULL,
  `level_yearbatch` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login_table`
--

CREATE TABLE `login_table` (
  `lid` int(11) NOT NULL,
  `user_number` varchar(25) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(65) NOT NULL,
  `userlevel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`lid`, `user_number`, `username`, `password`, `userlevel`) VALUES
(8, '2019-0307', 'admin', 'ECD71870D1963316A97E3AC3408C9835AD8CF0F3C1BC703527C30265534F75AE', 'SUPER ADMIN'),
(10, '2014-1236', 'registrar', 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae', 'REGISTRAR');

-- --------------------------------------------------------

--
-- Table structure for table `subject_table`
--

CREATE TABLE `subject_table` (
  `sid` int(11) NOT NULL,
  `subject_code` varchar(20) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `subject_teacher` varchar(50) NOT NULL,
  `coursecode` varchar(20) NOT NULL,
  `term` varchar(15) NOT NULL,
  `year` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher_table`
--

CREATE TABLE `teacher_table` (
  `tid` int(11) NOT NULL,
  `teacher_id` varchar(20) NOT NULL,
  `teacher_fname` varchar(50) NOT NULL,
  `teacher_mname` varchar(30) NOT NULL,
  `teacher_lname` varchar(30) NOT NULL,
  `coursecode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `tkid` int(11) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `userlevel` varchar(20) NOT NULL,
  `token` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement_table`
--
ALTER TABLE `announcement_table`
  ADD PRIMARY KEY (`atid`);

--
-- Indexes for table `enrollsubject_table`
--
ALTER TABLE `enrollsubject_table`
  ADD PRIMARY KEY (`esid`);

--
-- Indexes for table `gradelevel_table`
--
ALTER TABLE `gradelevel_table`
  ADD PRIMARY KEY (`gid`);

--
-- Indexes for table `login_table`
--
ALTER TABLE `login_table`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `subject_table`
--
ALTER TABLE `subject_table`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `teacher_table`
--
ALTER TABLE `teacher_table`
  ADD PRIMARY KEY (`tid`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`tkid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement_table`
--
ALTER TABLE `announcement_table`
  MODIFY `atid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `enrollsubject_table`
--
ALTER TABLE `enrollsubject_table`
  MODIFY `esid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gradelevel_table`
--
ALTER TABLE `gradelevel_table`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `subject_table`
--
ALTER TABLE `subject_table`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacher_table`
--
ALTER TABLE `teacher_table`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `tkid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
