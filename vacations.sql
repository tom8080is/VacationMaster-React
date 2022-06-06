-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `user_id` bigint NOT NULL,
  `vacation_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (2,28),(2,29),(2,30),(2,31),(14,31),(14,30),(14,29),(42,29),(14,28),(42,33),(42,32);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `first_name` varchar(500) NOT NULL,
  `last_name` varchar(500) NOT NULL,
  `type` varchar(500) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asd','123','asd@gmail.com','asd','asd','USER'),(2,'123','123','tom@gmail.com','123','123','USER'),(3,'xcv','xcv@','tom8080i@gmail.com','tom','slakman','USER'),(4,'tom','tom','tom@gmail.com','tom','tom','ADMIN'),(7,'asdasd','asda','asd@gmail.com','asdas','asasd','USER'),(8,'sdf','26a63fd8b036e3aa4d56b62e786f4efa','sdf@gmail.com','sdf','sdf','CUSTOMER'),(9,'zzz','26a63fd8b036e3aa4d56b62e786f4efa','','zzz','zzz','ADMIN'),(12,'123d','26a63fd8b036e3aa4d56b62e786f4efa','tom@gmail.com','123d','123','CUSTOMER'),(13,'12344','26a63fd8b036e3aa4d56b62e786f4efa','','123','123','CUSTOMER'),(14,'1235','26a63fd8b036e3aa4d56b62e786f4efa','222@gmail.com','1234','123','CUSTOMER'),(15,'sdfsdf','26a63fd8b036e3aa4d56b62e786f4efa','tom@gmail.com','ttt','ttt','CUSTOMER'),(16,'12366','26a63fd8b036e3aa4d56b62e786f4efa','123@gmaik.com','123','123','CUSTOMER'),(18,'asdasdsss','34fd4bc2da8469bd3b00e2c324dde599','tom8080i@gmail.com','asd','asd','CUSTOMER'),(23,'123444','4d9e27e530df214feefb0d503be082e1','sdf','sf','sdf','CUSTOMER'),(24,'zzz2','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(26,'zzzb','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(32,'234','234','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(34,'zzz1','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(35,'123667','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(36,'j','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','tom','2','CUSTOMER'),(37,'1232','26a63fd8b036e3aa4d56b62e786f4efa','tom8080i@gmail.com','123','123','CUSTOMER'),(38,'ASDSD','26a63fd8b036e3aa4d56b62e786f4efa','123@f.com','123','123','CUSTOMER'),(39,'zzzD','7bffd046a724d6e95a839aa76e60c45c','tom8080i@gmail.com','EE','slakmand','CUSTOMER'),(40,'1234444','34fd4bc2da8469bd3b00e2c324dde599','tom8080i@gmail.com','tom','s','CUSTOMER'),(41,'22','7bffd046a724d6e95a839aa76e60c45c','tom8080i@gmail.com','21','12','CUSTOMER'),(42,'123456','7bffd046a724d6e95a839aa76e60c45c','tom8080i@gmail.com','tom','slakman','CUSTOMER'),(43,'123333','7bffd046a724d6e95a839aa76e60c45c','123456','tom','slakman','CUSTOMER'),(44,'shiran123','7bffd046a724d6e95a839aa76e60c45c','ZZZ','shiran','moshe','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` bigint NOT NULL AUTO_INCREMENT,
  `destination` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `from_date` varchar(500) NOT NULL,
  `to_date` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (28,'France','Amazing franch Paris','2021-08-06','2021-08-19','400','https://scx2.b-cdn.net/gfx/news/hires/2019/france.jpg'),(29,'Miami','asdasfsdfsdf','2021-08-26','2021-08-24','120','https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2013/05/GettyImages-1204043845-720x480.jpg'),(30,'Hawaii Island ','Located just a few miles from the fishing village of Kailua-Kona','2021-08-12','2021-08-26','800','https://www.oyster.com/wp-content/uploads/sites/35/2019/10/Hanauma-Bay-Oahu-Hawaii.jpg'),(31,'Costa Rica','Inspired by the vibrant culture of Guanacaste','2021-08-03','2021-08-26','200','https://www.telegraph.co.uk/content/dam/Travel/2019/May/costa-rica-jungle-xlarge.jpg'),(32,'Las Vegas','If you enjoy eating like royalty, gambling in style and taking in world-class entertainment, this all-suite hotel might be an excellent ','2001-04-20','2021-08-17','1000','https://cdn.getyourguide.com/img/location/5ffeb496e3e09.jpeg/88.jpg'),(33,'Bora Bora','Le Taha’a Island Resort & Spa is accessible by a 35-minute boat ride from the Raiatea airport','2021-08-06','2021-08-06','234','https://pix10.agoda.net/hotelImages/2311976/0/28f866c007b559024a4833e6ea93217b.jpg?s=1024x768');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-28 23:08:42
