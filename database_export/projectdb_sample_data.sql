-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Oct 27, 2026 at 08:02 AM
-- Server version: 10.4.34-MariaDB-1:10.4.34+maria~ubu2004
-- PHP Version: 7.4.15

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
  `AccountID` int(11) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `ImageID` int(11) NOT NULL,
  `Filename` varchar(64) NOT NULL,
  `Caption` varchar(64) NOT NULL,
  `Created` datetime NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT 1,
  `Updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`ImageID`, `Filename`, `Caption`, `Created`, `Active`, `Updated`) VALUES
(1, 'item01.jpg', '', '2026-10-27 05:25:48', 1, '2026-10-27 05:25:48'),
(2, 'item02.webp', '', '2026-10-27 05:25:48', 1, '2026-10-27 05:25:48'),
(3, 'item03.jpg', '', '2026-10-27 05:26:23', 1, '2026-10-27 05:26:23'),
(4, 'item05.jpg', '', '2026-10-27 05:26:23', 1, '2026-10-27 05:26:23'),
(5, 'item06.jpg', '', '2026-10-27 05:27:05', 1, '2026-10-27 05:27:05'),
(6, 'item07.jpg', '', '2026-10-27 05:27:05', 1, '2026-10-27 05:27:05'),
(7, 'item08.jpg', '', '2026-10-27 05:27:38', 1, '2026-10-27 05:27:38'),
(8, 'item09.jpg', '', '2026-10-27 05:27:38', 1, '2026-10-27 05:27:38'),
(9, 'item10.webp', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(10, 'item12.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(11, 'item13.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(12, 'item14.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(13, 'item15.jpg', '', '2026-10-27 05:30:58', 1, '2026-10-27 05:30:58'),
(14, 'item16.webp', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(15, 'item17.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(16, 'item18.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(17, 'item19.jpg', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17'),
(18, 'item20.webp', '', '2026-10-27 05:32:17', 1, '2026-10-27 05:32:17');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` int(11) NOT NULL,
  `ProductCode` varchar(16) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Brand` varchar(32) NOT NULL,
  `Created` datetime DEFAULT NULL,
  `Updated` datetime DEFAULT current_timestamp(),
  `Active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Table structure for table `Product_Image`
--

CREATE TABLE `Product_Image` (
  `ProductID` int(11) NOT NULL,
  `ImageID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(18, 18);

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `ReviewID` int(11) NOT NULL,
  `Title` varchar(64) NOT NULL,
  `Body` varchar(512) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `Name` int(11) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`AccountID`);

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
  MODIFY `AccountID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Image`
--
ALTER TABLE `Image`
  MODIFY `ImageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Review`
--
ALTER TABLE `Review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
