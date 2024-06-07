DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
    `studentID` INT(5) PRIMARY KEY NOT NULL,
    `lastName` VARCHAR(15) NOT NULL,
    `firstName` VARCHAR(20) NOT NULL,
    `middleInitial` VARCHAR(1) NOT NULL,
    `email` VARCHAR(25) NOT NULL,
    `password` VARCHAR(15) NOT NULL
);

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
    `classID` INT(5) PRIMARY KEY NOT NULL,
    `className` VARCHAR(10) NOT NULL,
    `rows` INT NOT NULL,
    `cols` INT NOT NULL
);

DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
    `seatID` INT(5) PRIMARY KEY NOT NULL,
    `rowNo` INT NOT NULL,
    `colNo` INT NOT NULL,
    `status` enum('booked','available') NOT NULL,
    `date` DATE,
    `studentID` INT(5),
    `classID` INT(5) NOT NULL,
    FOREIGN KEY (`studentID`) REFERENCES students(`studentID`),
    FOREIGN KEY (`classID`) REFERENCES class(`classID`)
);

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
    `reservationID` INT(5) PRIMARY KEY NOT NULL,
    `studentID` INT(5) NOT NULL,
    `seatID` INT(5) NOT NULL,
    `date` DATE NOT NULL,
    FOREIGN KEY (`studentID`) REFERENCES students(`studentID`),
    FOREIGN KEY (`seatID`) REFERENCES seats(`seatID`)
);

-- Sample Values --
INSERT INTO `students` (`studentID`, `lastName`, `firstName`, `middleInitial`, `email`, `password`) VALUES
(10001, 'Corpuz', 'Ashley', 'L', 'nicole_corpuz@dlsu.edu.ph', 'ashley123'),
(10002, 'Flores', 'Neil', 'S', 'neil_flores@dlsu.edu.ph', 'neil456'),
(10003, 'Lee', 'Justin', 'T', 'justin_lee@dlsu.edu.ph', 'justin789'),
(10004, 'Visto', 'Herise', 'F', 'herise_visto@dlsu.edu.ph', 'her1011');

INSERT INTO `class` (`classID`, `className`, `rows`, `cols`) VALUES
(20001, 'CCPROG1', 6, 4),
(20002, 'ITNET01', 5, 4);

INSERT INTO `seats` (`seatID`, `rowNo`, `colNo`, `status`, `date`, `studentID`, `classID`) VALUES
(30001, 1, 1, 'booked', '2024-06-01', 10001, 20001),
(30002, 1, 2, 'available', NULL, NULL, 20001),
(30003, 1, 3, 'available', NULL, NULL, 20001),
(30004, 1, 4, 'available', NULL, NULL, 20001),
(30005, 2, 1, 'available', NULL, NULL, 20001),
(30006, 2, 2, 'available', NULL, NULL, 20001),
(30007, 2, 3, 'available', NULL, NULL, 20001),
(30008, 2, 4, 'booked', '2024-06-01', 10002, 20001),
(30009, 3, 1, 'available', NULL, NULL, 20001),
(30010, 3, 2, 'available', NULL, NULL, 20001),
(30011, 3, 3, 'booked', '2024-06-01', 10003, 20001),
(30012, 3, 4, 'available', NULL, NULL, 20001),
(30013, 4, 1, 'available', NULL, NULL, 20001),
(30014, 4, 2, 'available', NULL, NULL, 20001),
(30015, 4, 3, 'available', NULL, NULL, 20001),
(30016, 4, 4, 'booked', '2024-06-01', 10004, 20001),
(30017, 5, 1, 'available', NULL, NULL, 20001),
(30018, 5, 2, 'available', NULL, NULL, 20001),
(30019, 5, 3, 'available', NULL, NULL, 20001),
(30020, 5, 4, 'available', NULL, NULL, 20001),
(30021, 6, 1, 'available', NULL, NULL, 20001),
(30022, 6, 2, 'available', NULL, NULL, 20001),
(30023, 6, 3, 'available', NULL, NULL, 20001),
(30024, 6, 4, 'available', NULL, NULL, 20001);

INSERT INTO `reservations` (`reservationID`, `studentID`, `seatID`, `date`) VALUES
(40001, 10001, 30001, '2024-06-01'),
(40002, 10002, 30008, '2024-06-01'),
(40003, 10003, 30011, '2024-06-01'),
(40004, 10004, 30016, '2024-06-01');