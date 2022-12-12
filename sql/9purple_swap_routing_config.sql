CREATE TABLE `9purple_swap_routing_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) DEFAULT NULL,
  `decimals` int(11) DEFAULT NULL,
  `chainId` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isBase` tinyint(4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;