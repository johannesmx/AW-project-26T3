-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Nov 23, 2026 at 11:30 PM
-- Server version: 8.4.13
-- PHP Version: 8.3.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Account`
--

CREATE TABLE `Account` (
  `AccountID` int NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Account`
--

INSERT INTO `Account` (`AccountID`, `Email`, `Password`, `Created`, `Updated`, `Active`) VALUES
(3, 'test@gmail.com', 'test', '2026-11-22 07:52:16', '2026-11-22 07:52:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `Name`, `Description`, `Active`) VALUES
(1, 'Logitech', '', 1),
(2, 'Keychron', '', 1),
(3, 'Anker', '', 1),
(4, 'JBL', '', 1),
(5, 'Sony', '', 1),
(6, 'UGREEN', '', 1),
(7, 'Samsung', '', 1),
(8, 'Belkin', '', 1),
(9, 'Razer', '', 1),
(10, 'Garmin', '', 1),
(11, 'SanDisk', '', 1),
(12, 'ASUS', '', 1),
(13, 'TP-Link', '', 1),
(14, 'HyperX', '', 1),
(15, 'Philips', '', 1),
(16, 'Spigen', '', 1),
(17, 'North Bayou', '', 1),
(18, 'Blue', '', 1),
(19, 'Targus', '', 1),
(20, 'Seagate', '', 1),
(21, 'Philips Hue', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `ImageID` int NOT NULL,
  `Filename` varchar(64) NOT NULL,
  `Caption` varchar(64) NOT NULL,
  `Created` datetime NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  `Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`ImageID`, `Filename`, `Caption`, `Created`, `Active`, `Updated`) VALUES
(1, 'item01.jpg', '', '2026-10-27 05:25:48', 1, '2026-10-27 05:25:48'),
(2, 'item02.avif', '', '2026-10-27 05:25:48', 1, '2026-10-27 05:25:48'),
(3, 'item03.jpg', '', '2026-10-27 05:26:23', 1, '2026-10-27 05:26:23'),
(4, 'item04.jpg', '', '2026-10-27 05:26:23', 1, '2026-10-27 05:26:23'),
(5, 'item05.avif', '', '2026-10-27 05:27:05', 1, '2026-10-27 05:27:05'),
(6, 'item06.webp', '', '2026-10-27 05:27:05', 1, '2026-10-27 05:27:05'),
(7, 'item07.jpg', '', '2026-10-27 05:27:38', 1, '2026-10-27 05:27:38'),
(8, 'item08.jpeg', '', '2026-10-27 05:27:38', 1, '2026-10-27 05:27:38'),
(9, 'item09.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(10, 'item10.webp', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(11, 'item11.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(12, 'item14.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(13, 'item13.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(14, 'item14.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(15, 'item15.webp', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(16, 'item16.jpeg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(17, 'item17.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(18, 'item18.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(19, 'item19.jpg', '', '2026-11-17 22:31:35', 1, '2026-11-17 11:31:57'),
(20, 'item20.jpeg', '', '2026-11-17 22:37:54', 1, '2026-11-17 11:38:11'),
(21, 'item21.webp', '', '2026-11-17 23:54:20', 1, '2026-11-17 12:54:37'),
(22, 'item22.jpg', '', '2026-11-17 12:56:14', 1, '2026-11-17 12:56:30'),
(23, 'item23.jpg', '', '2026-11-17 23:57:38', 1, '2026-11-17 12:57:54'),
(24, 'item24.jpg', '', '2026-11-17 12:58:38', 1, '2026-11-17 12:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` int NOT NULL,
  `ProductCode` varchar(16) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Brand` varchar(32) NOT NULL,
  `Created` datetime DEFAULT NULL,
  `Updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ProductID`, `ProductCode`, `Name`, `Description`, `Brand`, `Created`, `Updated`, `Active`) VALUES
(1, 'PRD-001', 'Wireless Mouse', 'Ergonomic wireless optical mouse', 'Logitech', '2026-01-05 00:00:00', '2026-09-10 00:00:00', 1),
(2, 'PRD-002', 'Mechanical Keyboard', 'RGB mechanical gaming keyboard', 'Keychron', '2026-01-08 00:00:00', '2026-09-12 00:00:00', 1),
(3, 'PRD-003', 'USB-C Hub', '7-in-1 USB-C multiport adapter', 'Anker', '2026-01-12 00:00:00', '2026-08-15 00:00:00', 1),
(4, 'PRD-004', 'Bluetooth Speaker', 'Portable wireless Bluetooth speaker', 'JBL', '2026-01-15 00:00:00', '2026-09-20 00:00:00', 1),
(5, 'PRD-005', 'Noise Cancelling Headphones', 'Over-ear headphones with ANC', 'Sony', '2026-01-20 00:00:00', '2026-10-01 00:00:00', 1),
(6, 'PRD-006', 'Laptop Stand', 'Adjustable aluminium laptop stand', 'UGREEN', '2026-02-01 00:00:00', '2026-08-05 00:00:00', 1),
(7, 'PRD-007', 'Webcam HD', '1080p webcam with built-in microphone', 'Logitech', '2026-02-05 00:00:00', '2026-09-18 00:00:00', 1),
(8, 'PRD-008', 'External SSD 1TB', 'Portable high-speed solid-state drive', 'Samsung', '2026-02-10 00:00:00', '2026-10-02 00:00:00', 1),
(9, 'PRD-009', 'Wireless Charger', '15W Qi wireless charging pad', 'Belkin', '2026-02-15 00:00:00', '2026-07-22 00:00:00', 1),
(10, 'PRD-010', 'Gaming Mouse Pad', 'Extended anti-slip gaming mouse pad', 'Razer', '2026-02-20 00:00:00', '2026-09-15 00:00:00', 1),
(11, 'PRD-011', 'Smart Watch', 'Fitness tracking smartwatch', 'Garmin', '2026-03-01 00:00:00', '2026-10-05 00:00:00', 1),
(12, 'PRD-012', 'USB Flash Drive 128GB', 'USB 3.2 portable flash storage', 'SanDisk', '2026-03-05 00:00:00', '2026-08-30 00:00:00', 1),
(13, 'PRD-013', 'Portable Monitor', '15.6-inch Full HD portable display', 'ASUS', '2026-03-10 00:00:00', '2026-09-25 00:00:00', 1),
(14, 'PRD-014', 'Ethernet Adapter', 'USB-C to Gigabit Ethernet adapter', 'TP-Link', '2026-03-15 00:00:00', '2026-07-10 00:00:00', 1),
(15, 'PRD-015', 'Power Bank 20000mAh', 'High-capacity portable USB-C charger', 'Anker', '2026-03-20 00:00:00', '2026-10-08 00:00:00', 1),
(16, 'PRD-016', 'Gaming Headset', 'Surround sound gaming headphones', 'HyperX', '2026-04-01 00:00:00', '2026-09-28 00:00:00', 1),
(17, 'PRD-017', 'Desk Lamp LED', 'Adjustable LED desk lamp', 'Philips', '2026-04-05 00:00:00', '2026-08-12 00:00:00', 1),
(18, 'PRD-018', 'Wireless Earbuds', 'True wireless in-ear headphones', 'JBL', '2026-04-10 00:00:00', '2026-10-10 00:00:00', 1),
(19, 'PRD-019', 'HDMI Cable 2m', 'High-speed 4K HDMI cable', 'Belkin', '2026-04-15 00:00:00', '2026-07-18 00:00:00', 1),
(20, 'PRD-020', 'Smart Home Plug', 'Wi-Fi enabled smart power plug', 'TP-Link', '2026-04-20 00:00:00', '2026-09-22 00:00:00', 1),
(21, 'PRD-021', 'Tablet Case', 'Protective folio tablet cover', 'Spigen', '2026-05-01 00:00:00', '2026-08-20 00:00:00', 1),
(22, 'PRD-022', 'Bluetooth Keyboard', 'Compact wireless Bluetooth keyboard', 'Logitech', '2026-05-05 00:00:00', '2026-10-12 00:00:00', 1),
(23, 'PRD-023', 'Monitor Arm', 'Adjustable single monitor desk mount', 'North Bayou', '2026-05-10 00:00:00', '2026-09-08 00:00:00', 1),
(24, 'PRD-024', 'USB Microphone', 'Condenser microphone for streaming', 'Blue', '2026-05-15 00:00:00', '2026-10-15 00:00:00', 1),
(25, 'PRD-025', 'Wi-Fi Router', 'Dual-band Wi-Fi 6 wireless router', 'ASUS', '2026-05-20 00:00:00', '2026-09-30 00:00:00', 1),
(26, 'PRD-026', 'Laptop Backpack', 'Water-resistant laptop backpack', 'Targus', '2026-06-01 00:00:00', '2026-08-25 00:00:00', 1),
(27, 'PRD-027', 'USB-C Cable 1m', 'Fast charging USB-C data cable', 'UGREEN', '2026-06-05 00:00:00', '2026-07-30 00:00:00', 1),
(28, 'PRD-028', 'External Hard Drive 2TB', 'Portable USB 3.0 external storage', 'Seagate', '2026-06-10 00:00:00', '2026-10-18 00:00:00', 1),
(29, 'PRD-029', 'Smart Light Bulb', 'Wi-Fi enabled colour-changing LED bulb', 'Philips Hue', '2026-06-15 00:00:00', '2026-09-17 00:00:00', 1),
(30, 'PRD-030', 'Wireless Presenter', 'Wireless presentation clicker', 'Logitech', '2026-06-20 00:00:00', '2026-10-20 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Product_Category`
--

CREATE TABLE `Product_Category` (
  `ID` int NOT NULL,
  `ProductID` int NOT NULL,
  `CategoryID` int NOT NULL,
  `Description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `Product_Category`
--

INSERT INTO `Product_Category` (`ID`, `ProductID`, `CategoryID`, `Description`) VALUES
(1, 1, 1, ''),
(2, 2, 2, ''),
(3, 3, 3, ''),
(4, 4, 4, ''),
(5, 5, 5, ''),
(6, 6, 6, ''),
(7, 7, 1, ''),
(8, 8, 7, ''),
(9, 9, 8, ''),
(10, 10, 9, ''),
(11, 11, 10, ''),
(12, 12, 11, ''),
(13, 13, 12, ''),
(14, 14, 13, ''),
(15, 15, 3, ''),
(16, 16, 14, ''),
(17, 17, 15, ''),
(18, 18, 4, ''),
(19, 19, 8, ''),
(20, 20, 13, ''),
(21, 21, 16, ''),
(22, 22, 1, ''),
(23, 23, 17, ''),
(24, 24, 18, ''),
(25, 25, 12, ''),
(26, 25, 19, ''),
(27, 27, 6, ''),
(28, 28, 20, ''),
(29, 29, 21, ''),
(30, 30, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `Product_Image`
--

CREATE TABLE `Product_Image` (
  `ProductID` int NOT NULL,
  `ImageID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Product_Image`
--

INSERT INTO `Product_Image` (`ProductID`, `ImageID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `ReviewID` int NOT NULL,
  `Title` varchar(64) NOT NULL,
  `Body` varchar(512) NOT NULL,
  `ProductID` int NOT NULL,
  `Rating` int NOT NULL,
  `UserID` int NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int NOT NULL,
  `Name` varchar(32) NOT NULL,
  `AccountID` int NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `Name`, `AccountID`, `Created`, `Updated`, `Active`) VALUES
(1, 'testuser', 3, '2026-11-22 07:52:16', '2026-11-22 07:52:16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`ImageID`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `Product_Category`
--
ALTER TABLE `Product_Category`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Product_Category_Product` (`ProductID`),
  ADD KEY `Product_Category_Category` (`CategoryID`);

--
-- Indexes for table `Product_Image`
--
ALTER TABLE `Product_Image`
  ADD KEY `Product_Image_Image_ID` (`ImageID`),
  ADD KEY `Product_Image_Product_ID` (`ProductID`);

--
-- Indexes for table `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `Review_User_ID` (`UserID`),
  ADD KEY `Review_Product_ID` (`ProductID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `User_Account_ID` (`AccountID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Account`
--
ALTER TABLE `Account`
  MODIFY `AccountID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `CategoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Image`
--
ALTER TABLE `Image`
  MODIFY `ImageID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Product_Category`
--
ALTER TABLE `Product_Category`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Review`
--
ALTER TABLE `Review`
  MODIFY `ReviewID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Product_Category`
--
ALTER TABLE `Product_Category`
  ADD CONSTRAINT `Product_Category_Category` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `Product_Category_Product` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Product_Image`
--
ALTER TABLE `Product_Image`
  ADD CONSTRAINT `Product_Image_Image_ID` FOREIGN KEY (`ImageID`) REFERENCES `Image` (`ImageID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Product_Image_Product_ID` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON UPDATE CASCADE;

--
-- Constraints for table `Review`
--
ALTER TABLE `Review`
  ADD CONSTRAINT `Review_Product_ID` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Review_User_ID` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_Account_ID` FOREIGN KEY (`AccountID`) REFERENCES `Account` (`AccountID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
