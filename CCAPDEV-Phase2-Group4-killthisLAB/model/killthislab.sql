-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2024 at 06:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `killthislab`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int(8) NOT NULL,
  `LastName` varchar(10) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `MiddleInitial` varchar(1) DEFAULT NULL,
  `Email` varchar(15) NOT NULL,
  `Password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminID`, `LastName`, `FirstName`, `MiddleInitial`, `Email`, `Password`) VALUES
(20001, 'Caronongan', 'Arturo', NULL, 'admin@gmail.com', 'corgi@dlsu');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `classID` int(5) NOT NULL,
  `bldg` varchar(10) NOT NULL,
  `section` varchar(5) NOT NULL,
  `className` varchar(10) NOT NULL,
  `floor` int(11) NOT NULL,
  `rows` int(11) NOT NULL,
  `cols` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`classID`, `bldg`, `section`, `className`, `floor`, `rows`, `cols`, `date`, `time`) VALUES
(10101, 'Andrew', 'S17', 'CCDSTRU', 17, 4, 8, '2024-08-01', '09:30:00'),
(10102, 'Andrew', 'S18', 'CCDSTRU', 17, 4, 8, '2024-08-01', '07:30:00'),
(10103, 'Gokongwei', 'S17', 'CCAPDEV', 3, 2, 10, '2024-08-01', '09:30:00'),
(10104, 'Yuchengco', 'Y01', 'LCENWRD', 5, 5, 8, '2024-08-01', '11:30:00'),
(10105, 'Yuchengco', 'Y02', 'LCENWRD', 4, 5, 8, '2024-08-02', '11:30:00'),
(10106, 'Gokongwei', 'S18', 'CCAPDEV', 3, 2, 10, '2024-08-02', '12:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `locationID` int(5) NOT NULL,
  `bldg` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`locationID`, `bldg`) VALUES
(10001, 'Andrew'),
(10003, 'Gokongwei'),
(10004, 'LS'),
(10002, 'Velasco'),
(10005, 'Yuchengco');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservationID` int(5) NOT NULL,
  `userID` int(8) DEFAULT NULL,
  `seatID` int(5) NOT NULL,
  `section` varchar(5) NOT NULL,
  `reservationDATE` date NOT NULL,
  `reservationTIME` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seatID` int(5) NOT NULL,
  `classID` int(5) NOT NULL,
  `rowNo` int(11) NOT NULL,
  `colNo` int(11) NOT NULL,
  `status` enum('BOOKED','AVAILABLE','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`seatID`, `classID`, `rowNo`, `colNo`, `status`) VALUES
(5000, 10101, 1, 1, 'AVAILABLE'),
(5001, 10101, 1, 2, 'AVAILABLE'),
(5002, 10101, 1, 3, 'BOOKED'),
(5003, 10101, 1, 4, 'BOOKED'),
(5004, 10101, 1, 5, 'AVAILABLE'),
(5005, 10101, 1, 6, 'AVAILABLE'),
(5006, 10101, 1, 7, 'AVAILABLE'),
(5007, 10101, 1, 8, 'BOOKED'),
(5008, 10101, 2, 1, 'AVAILABLE'),
(5009, 10101, 2, 2, 'AVAILABLE'),
(5010, 10101, 2, 3, 'AVAILABLE'),
(5011, 10101, 2, 4, 'AVAILABLE'),
(5012, 10101, 2, 5, 'BOOKED'),
(5013, 10101, 2, 6, 'AVAILABLE'),
(5014, 10101, 2, 7, 'AVAILABLE'),
(5015, 10101, 2, 8, 'AVAILABLE'),
(5016, 10101, 3, 1, 'BOOKED'),
(5017, 10101, 3, 2, 'AVAILABLE'),
(5018, 10101, 3, 3, 'AVAILABLE'),
(5019, 10101, 3, 4, 'AVAILABLE'),
(5020, 10101, 3, 5, 'AVAILABLE'),
(5021, 10101, 3, 6, 'AVAILABLE'),
(5022, 10101, 3, 7, 'AVAILABLE'),
(5023, 10101, 3, 8, 'BOOKED'),
(5024, 10101, 4, 1, 'AVAILABLE'),
(5025, 10101, 4, 2, 'BOOKED'),
(5026, 10101, 4, 3, 'AVAILABLE'),
(5027, 10101, 4, 4, 'AVAILABLE'),
(5028, 10101, 4, 5, 'AVAILABLE'),
(5029, 10101, 4, 6, 'AVAILABLE'),
(5030, 10101, 4, 7, 'AVAILABLE'),
(5031, 10101, 4, 8, 'AVAILABLE'),
(5032, 10102, 1, 1, 'BOOKED'),
(5033, 10102, 1, 2, 'AVAILABLE'),
(5034, 10102, 1, 3, 'AVAILABLE'),
(5035, 10102, 1, 4, 'AVAILABLE'),
(5036, 10102, 1, 5, 'BOOKED'),
(5037, 10102, 1, 6, 'AVAILABLE'),
(5038, 10102, 1, 7, 'AVAILABLE'),
(5039, 10102, 1, 8, 'AVAILABLE'),
(5040, 10102, 2, 1, 'AVAILABLE'),
(5041, 10102, 2, 2, 'BOOKED'),
(5042, 10102, 2, 3, 'AVAILABLE'),
(5043, 10102, 2, 4, 'BOOKED'),
(5044, 10102, 2, 5, 'AVAILABLE'),
(5045, 10102, 2, 6, 'AVAILABLE'),
(5046, 10102, 2, 7, 'AVAILABLE'),
(5047, 10102, 2, 8, 'AVAILABLE'),
(5048, 10102, 3, 1, 'BOOKED'),
(5049, 10102, 3, 2, 'AVAILABLE'),
(5050, 10102, 3, 3, 'AVAILABLE'),
(5051, 10102, 3, 4, 'AVAILABLE'),
(5052, 10102, 3, 5, 'AVAILABLE'),
(5053, 10102, 3, 6, 'BOOKED'),
(5054, 10102, 3, 7, 'AVAILABLE'),
(5055, 10102, 3, 8, 'AVAILABLE'),
(5056, 10102, 4, 1, 'AVAILABLE'),
(5057, 10102, 4, 2, 'AVAILABLE'),
(5058, 10102, 4, 3, 'BOOKED'),
(5059, 10102, 4, 4, 'AVAILABLE'),
(5060, 10102, 4, 5, 'AVAILABLE'),
(5061, 10102, 4, 6, 'AVAILABLE'),
(5062, 10102, 4, 7, 'AVAILABLE'),
(5063, 10102, 4, 8, 'BOOKED'),
(5064, 10103, 1, 1, 'BOOKED'),
(5065, 10103, 1, 2, 'AVAILABLE'),
(5066, 10103, 1, 3, 'AVAILABLE'),
(5067, 10103, 1, 4, 'AVAILABLE'),
(5068, 10103, 1, 5, 'BOOKED'),
(5069, 10103, 1, 6, 'AVAILABLE'),
(5070, 10103, 1, 7, 'AVAILABLE'),
(5071, 10103, 1, 8, 'AVAILABLE'),
(5072, 10103, 1, 9, 'AVAILABLE'),
(5073, 10103, 1, 10, 'BOOKED'),
(5074, 10103, 2, 1, 'AVAILABLE'),
(5075, 10103, 2, 2, 'BOOKED'),
(5076, 10103, 2, 3, 'AVAILABLE'),
(5077, 10103, 2, 4, 'AVAILABLE'),
(5078, 10103, 2, 5, 'BOOKED'),
(5079, 10103, 2, 6, 'AVAILABLE'),
(5080, 10103, 2, 7, 'BOOKED'),
(5081, 10103, 2, 8, 'AVAILABLE'),
(5082, 10103, 2, 9, 'AVAILABLE'),
(5083, 10103, 2, 10, 'AVAILABLE'),
(5084, 10104, 1, 1, 'BOOKED'),
(5085, 10104, 1, 2, 'AVAILABLE'),
(5086, 10104, 1, 3, 'BOOKED'),
(5087, 10104, 1, 4, 'AVAILABLE'),
(5088, 10104, 1, 5, 'AVAILABLE'),
(5089, 10104, 1, 6, 'BOOKED'),
(5090, 10104, 1, 7, 'AVAILABLE'),
(5091, 10104, 1, 8, 'BOOKED'),
(5092, 10104, 2, 1, 'AVAILABLE'),
(5093, 10104, 2, 2, 'AVAILABLE'),
(5094, 10104, 2, 3, 'BOOKED'),
(5095, 10104, 2, 4, 'AVAILABLE'),
(5096, 10104, 2, 5, 'AVAILABLE'),
(5097, 10104, 2, 6, 'BOOKED'),
(5098, 10104, 2, 7, 'AVAILABLE'),
(5099, 10104, 2, 8, 'AVAILABLE'),
(5100, 10104, 3, 1, 'BOOKED'),
(5101, 10104, 3, 2, 'AVAILABLE'),
(5102, 10104, 3, 3, 'BOOKED'),
(5103, 10104, 3, 4, 'AVAILABLE'),
(5104, 10104, 3, 5, 'AVAILABLE'),
(5105, 10104, 3, 6, 'AVAILABLE'),
(5106, 10104, 3, 7, 'AVAILABLE'),
(5107, 10104, 3, 8, 'BOOKED'),
(5108, 10104, 4, 1, 'AVAILABLE'),
(5109, 10104, 4, 2, 'BOOKED'),
(5110, 10104, 4, 3, 'AVAILABLE'),
(5111, 10104, 4, 4, 'AVAILABLE'),
(5112, 10104, 4, 5, 'AVAILABLE'),
(5113, 10104, 4, 6, 'AVAILABLE'),
(5114, 10104, 4, 7, 'AVAILABLE'),
(5115, 10104, 4, 8, 'BOOKED'),
(5116, 10104, 5, 1, 'BOOKED'),
(5117, 10104, 5, 2, 'AVAILABLE'),
(5118, 10104, 5, 3, 'BOOKED'),
(5119, 10104, 5, 4, 'AVAILABLE'),
(5120, 10104, 5, 5, 'AVAILABLE'),
(5121, 10104, 5, 6, 'AVAILABLE'),
(5122, 10104, 5, 7, 'AVAILABLE'),
(5123, 10104, 5, 8, 'AVAILABLE'),
(5124, 10105, 1, 1, 'BOOKED'),
(5125, 10105, 1, 2, 'AVAILABLE'),
(5126, 10105, 1, 3, 'BOOKED'),
(5127, 10105, 1, 4, 'AVAILABLE'),
(5128, 10105, 1, 5, 'AVAILABLE'),
(5129, 10105, 1, 6, 'BOOKED'),
(5130, 10105, 1, 7, 'AVAILABLE'),
(5131, 10105, 1, 8, 'BOOKED'),
(5132, 10105, 2, 1, 'AVAILABLE'),
(5133, 10105, 2, 2, 'AVAILABLE'),
(5134, 10105, 2, 3, 'BOOKED'),
(5135, 10105, 2, 4, 'AVAILABLE'),
(5136, 10105, 2, 5, 'AVAILABLE'),
(5137, 10105, 2, 6, 'BOOKED'),
(5138, 10105, 2, 7, 'AVAILABLE'),
(5139, 10105, 2, 8, 'AVAILABLE'),
(5140, 10105, 3, 1, 'BOOKED'),
(5141, 10105, 3, 2, 'AVAILABLE'),
(5142, 10105, 3, 3, 'BOOKED'),
(5143, 10105, 3, 4, 'AVAILABLE'),
(5144, 10105, 3, 5, 'AVAILABLE'),
(5145, 10105, 3, 6, 'AVAILABLE'),
(5146, 10105, 3, 7, 'AVAILABLE'),
(5147, 10105, 3, 8, 'BOOKED'),
(5148, 10105, 4, 1, 'AVAILABLE'),
(5149, 10105, 4, 2, 'BOOKED'),
(5150, 10105, 4, 3, 'AVAILABLE'),
(5151, 10105, 4, 4, 'AVAILABLE'),
(5152, 10105, 4, 5, 'AVAILABLE'),
(5153, 10105, 4, 6, 'AVAILABLE'),
(5154, 10105, 4, 7, 'AVAILABLE'),
(5155, 10105, 4, 8, 'BOOKED'),
(5156, 10105, 5, 1, 'BOOKED'),
(5157, 10105, 5, 2, 'AVAILABLE'),
(5158, 10105, 5, 3, 'BOOKED'),
(5159, 10105, 5, 4, 'AVAILABLE'),
(5160, 10105, 5, 5, 'AVAILABLE'),
(5161, 10105, 5, 6, 'AVAILABLE'),
(5162, 10105, 5, 7, 'AVAILABLE'),
(5163, 10105, 5, 8, 'AVAILABLE'),
(5164, 10106, 1, 1, 'BOOKED'),
(5165, 10106, 1, 2, 'AVAILABLE'),
(5166, 10106, 1, 3, 'AVAILABLE'),
(5167, 10106, 1, 4, 'AVAILABLE'),
(5168, 10106, 1, 5, 'BOOKED'),
(5169, 10106, 1, 6, 'AVAILABLE'),
(5170, 10106, 1, 7, 'AVAILABLE'),
(5171, 10106, 1, 8, 'AVAILABLE'),
(5172, 10106, 1, 9, 'AVAILABLE'),
(5173, 10106, 1, 10, 'BOOKED'),
(5174, 10106, 2, 1, 'AVAILABLE'),
(5175, 10106, 2, 2, 'BOOKED'),
(5176, 10106, 2, 3, 'AVAILABLE'),
(5177, 10106, 2, 4, 'AVAILABLE'),
(5178, 10106, 2, 5, 'BOOKED'),
(5179, 10106, 2, 6, 'AVAILABLE'),
(5180, 10106, 2, 7, 'BOOKED'),
(5181, 10106, 2, 8, 'AVAILABLE'),
(5182, 10106, 2, 9, 'AVAILABLE'),
(5183, 10106, 2, 10, 'AVAILABLE');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentID` int(8) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `middleInitial` varchar(1) DEFAULT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(15) NOT NULL,
  `DisplayName` varchar(10) DEFAULT NULL,
  `Pronouns` enum('SHE/HER','HE/HIS','THEY/THEM','') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentID`, `lastName`, `firstName`, `middleInitial`, `email`, `password`, `DisplayName`, `Pronouns`) VALUES
(12235465, 'Corpuz', 'Ashley', 'L', 'nicole_corpuz@dlsu.edu.ph', 'ashley123', NULL, NULL),
(12247581, 'Lee', 'Justin', 'T', 'justin_lee@dlsu.edu.ph', 'justin789', NULL, NULL),
(12271879, 'Visto', 'Herise', 'F', 'herise_visto@dlsu.edu.ph', 'her1011', NULL, NULL),
(12274639, 'Flores', 'Neil', 'S', 'neil_flores@dlsu.edu.ph', 'neil456', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`classID`),
  ADD KEY `class_ibfk_1` (`bldg`),
  ADD KEY `section` (`section`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`locationID`),
  ADD KEY `bldg` (`bldg`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservationID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `seatID` (`seatID`),
  ADD KEY `section` (`section`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seatID`),
  ADD KEY `classID` (`classID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`bldg`) REFERENCES `location` (`bldg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `students` (`studentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `admin` (`adminID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_4` FOREIGN KEY (`seatID`) REFERENCES `seat` (`seatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_5` FOREIGN KEY (`section`) REFERENCES `class` (`section`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
