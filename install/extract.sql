-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le: Ven 27 Septembre 2013 à 10:42
-- Version du serveur: 5.5.27-log
-- Version de PHP: 5.4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `oda_pok`
--

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_contact`
--

CREATE TABLE IF NOT EXISTS `pok_tab_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_enreg` datetime NOT NULL,
  `reponse` varchar(250) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_log`
--

CREATE TABLE IF NOT EXISTS `pok_tab_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `type` int(4) NOT NULL,
  `commentaires` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=134 ;

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_menu`
--

CREATE TABLE IF NOT EXISTS `pok_tab_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(250) NOT NULL,
  `Description_courte` varchar(50) NOT NULL,
  `id_categorie` int(5) NOT NULL,
  `Lien` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `pok_tab_menu`
--

INSERT INTO `pok_tab_menu` (`id`, `Description`, `Description_courte`, `id_categorie`, `Lien`) VALUES
(1, 'L''accueil', 'L''accueil', 1, 'page_home.html'),
(2, 'Contact', 'Contact', 1, 'page_contact.html'),
(3, 'FAQ', 'FAQ', 1, 'page_faq.html'),
(4, 'Statistiques', 'Statistiques', 2, 'page_stats.html'),
(5, 'Acceuil', 'Acceuil', 1, 'page_home.html'),
(6, 'Créer un tournoi', 'Créer tournoi', 2, 'page_creer_tournoi.html'),
(7, 'Votre tournoi', 'Votre tournoi', 1, 'page_tournoi_param.html'),
(8, 'Votre tournoi', 'Votre tournoi', 1, 'page_tournoi_live.html'),
(9, 'Votre tournoi', 'Votre tournoi', 1, 'page_tournoi_histo.html');

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_menu_categorie`
--

CREATE TABLE IF NOT EXISTS `pok_tab_menu_categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) NOT NULL,
  `ouvert` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `pok_tab_menu_categorie`
--

INSERT INTO `pok_tab_menu_categorie` (`id`, `Description`, `ouvert`) VALUES
(1, 'L''accueil', 0),
(2, 'Administration', 0);

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_menu_rangs_droit`
--

CREATE TABLE IF NOT EXISTS `pok_tab_menu_rangs_droit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rang` int(5) NOT NULL,
  `id_menu` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rang` (`id_rang`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `pok_tab_menu_rangs_droit`
--

INSERT INTO `pok_tab_menu_rangs_droit` (`id`, `id_rang`, `id_menu`) VALUES
(1, 1, ';1;2;3;4;5;6;'),
(2, 30, ';1;2;3;5;');

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_parametres`
--

CREATE TABLE IF NOT EXISTS `pok_tab_parametres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_name` varchar(50) NOT NULL,
  `param_type` varchar(100) NOT NULL,
  `param_value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `pok_tab_parametres`
--

INSERT INTO `pok_tab_parametres` (`id`, `param_name`, `param_type`, `param_value`) VALUES
(1, 'nom_site', 'varchar', 'Happy''s Poker'),
(2, 'maintenance', 'int', '0');

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_participants`
--

CREATE TABLE IF NOT EXISTS `pok_tab_participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournoi` int(5) NOT NULL,
  `id_user` int(5) NOT NULL,
  `fin` datetime NOT NULL,
  `roundFin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_tournoi` (`id_tournoi`,`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `pok_tab_participants`
--

INSERT INTO `pok_tab_participants` (`id`, `id_tournoi`, `id_user`, `fin`, `roundFin`) VALUES
(8, 5, 2, '0000-00-00 00:00:00', 0),
(9, 5, 3, '0000-00-00 00:00:00', 0),
(10, 5, 1, '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_participants_tapis`
--

CREATE TABLE IF NOT EXISTS `pok_tab_participants_tapis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournoi` int(5) NOT NULL,
  `id_user` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `quant` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Contenu de la table `pok_tab_participants_tapis`
--

INSERT INTO `pok_tab_participants_tapis` (`id`, `id_tournoi`, `id_user`, `type`, `quant`) VALUES
(20, 5, 3, 'recave', '2013-09-27 10:18:58'),
(21, 5, 2, 'recave', '2013-09-27 10:18:59'),
(22, 5, 1, 'recave', '2013-09-27 10:19:00');

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_rangs`
--

CREATE TABLE IF NOT EXISTS `pok_tab_rangs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `labelle` varchar(250) NOT NULL,
  `indice` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `indice` (`indice`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `pok_tab_rangs`
--

INSERT INTO `pok_tab_rangs` (`id`, `labelle`, `indice`) VALUES
(1, 'Visiteur', 99),
(2, 'Dieu', 1),
(3, 'Superviseur', 10),
(4, 'Responsable', 20),
(5, 'Collaborateur', 30);

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_rounds`
--

CREATE TABLE IF NOT EXISTS `pok_tab_rounds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournoi` int(5) NOT NULL,
  `numRound` int(3) NOT NULL,
  `temps` int(5) NOT NULL,
  `tempsRestantSeconde` int(11) NOT NULL,
  `debutDecompte` datetime NOT NULL,
  `small_blind` int(5) NOT NULL,
  `big_blind` int(5) NOT NULL,
  `ante` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=47 ;

--
-- Contenu de la table `pok_tab_rounds`
--

INSERT INTO `pok_tab_rounds` (`id`, `id_tournoi`, `numRound`, `temps`, `tempsRestantSeconde`, `debutDecompte`, `small_blind`, `big_blind`, `ante`) VALUES
(1, 0, 1, 30, 10, '0000-00-00 00:00:00', 1, 2, 0),
(2, 0, 2, 30, 10, '0000-00-00 00:00:00', 5, 10, 0),
(3, 0, 3, 30, 10, '0000-00-00 00:00:00', 25, 50, 0),
(4, 0, 4, 30, 10, '0000-00-00 00:00:00', 50, 100, 0),
(5, 0, 5, 30, 10, '0000-00-00 00:00:00', 100, 200, 0),
(6, 0, 6, 30, 10, '0000-00-00 00:00:00', 200, 400, 0),
(7, 0, 7, 30, 10, '0000-00-00 00:00:00', 500, 1000, 100),
(8, 0, 8, 30, 10, '0000-00-00 00:00:00', 1000, 2000, 200),
(9, 1, 1, 30, 10, '0000-00-00 00:00:00', 1, 2, 0),
(10, 1, 2, 30, 10, '0000-00-00 00:00:00', 5, 10, 0),
(11, 1, 3, 30, 10, '0000-00-00 00:00:00', 25, 50, 0),
(12, 1, 4, 30, 10, '0000-00-00 00:00:00', 50, 100, 0),
(13, 1, 5, 30, 10, '0000-00-00 00:00:00', 100, 200, 0),
(14, 1, 6, 30, 10, '0000-00-00 00:00:00', 200, 400, 0),
(15, 1, 7, 30, 10, '0000-00-00 00:00:00', 500, 1000, 100),
(16, 1, 8, 30, 10, '0000-00-00 00:00:00', 1000, 2000, 200),
(24, 5, 1, 30, 1800, '0000-00-00 00:00:00', 1, 2, 0),
(25, 5, 2, 30, 1800, '0000-00-00 00:00:00', 5, 10, 0),
(26, 5, 3, 30, 1800, '0000-00-00 00:00:00', 25, 50, 0),
(27, 5, 4, 30, 1800, '0000-00-00 00:00:00', 50, 100, 0),
(28, 5, 5, 30, 1800, '0000-00-00 00:00:00', 100, 200, 0),
(29, 5, 6, 30, 1800, '0000-00-00 00:00:00', 200, 400, 0),
(30, 5, 7, 30, 1800, '0000-00-00 00:00:00', 500, 1000, 100),
(31, 5, 8, 30, 1800, '0000-00-00 00:00:00', 1000, 2000, 200),
(32, 4, 0, 0, 0, '0000-00-00 00:00:00', 1, 2, 0),
(33, 4, 0, 0, 0, '0000-00-00 00:00:00', 5, 10, 0),
(34, 4, 0, 0, 0, '0000-00-00 00:00:00', 25, 50, 0),
(35, 4, 0, 0, 0, '0000-00-00 00:00:00', 50, 100, 0),
(36, 4, 0, 0, 0, '0000-00-00 00:00:00', 100, 200, 0),
(37, 4, 0, 0, 0, '0000-00-00 00:00:00', 200, 400, 0),
(38, 4, 0, 0, 0, '0000-00-00 00:00:00', 500, 1000, 100),
(39, 4, 0, 0, 0, '0000-00-00 00:00:00', 1000, 2000, 200);

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_service_mail`
--

CREATE TABLE IF NOT EXISTS `pok_tab_service_mail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_service_mail_dest`
--

CREATE TABLE IF NOT EXISTS `pok_tab_service_mail_dest` (
  `id` int(11) NOT NULL,
  `id_type_mail` int(11) NOT NULL,
  `code_user` varchar(50) NOT NULL,
  `nivo` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_type_mail` (`id_type_mail`),
  KEY `code_user` (`code_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_statistiques_site`
--

CREATE TABLE IF NOT EXISTS `pok_tab_statistiques_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `code_user` varchar(50) NOT NULL,
  `page` varchar(250) NOT NULL,
  `action` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `code_user` (`code_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=533 ;

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_tapis`
--

CREATE TABLE IF NOT EXISTS `pok_tab_tapis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournois` int(5) NOT NULL,
  `valeur_jeton` int(5) NOT NULL,
  `nb_jeton` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=62 ;

--
-- Contenu de la table `pok_tab_tapis`
--

INSERT INTO `pok_tab_tapis` (`id`, `id_tournois`, `valeur_jeton`, `nb_jeton`) VALUES
(1, 0, 1, 10),
(2, 0, 5, 8),
(3, 0, 25, 6),
(4, 0, 50, 8),
(5, 0, 100, 4),
(6, 0, 500, 1),
(7, 0, 1000, 0),
(8, 0, 5000, 0),
(24, 1, 1, 10),
(25, 1, 5, 8),
(26, 1, 25, 6),
(27, 1, 50, 8),
(28, 1, 100, 4),
(29, 1, 500, 1),
(30, 1, 1000, 0),
(31, 1, 5000, 0),
(39, 5, 1, 10),
(40, 5, 5, 8),
(41, 5, 25, 6),
(42, 5, 50, 8),
(43, 5, 100, 4),
(44, 5, 500, 1),
(45, 5, 1000, 0),
(46, 5, 5000, 0),
(47, 4, 1, 10),
(48, 4, 5, 8),
(49, 4, 25, 6),
(50, 4, 50, 8),
(51, 4, 100, 4),
(52, 4, 500, 1),
(53, 4, 1000, 0),
(54, 4, 5000, 0);

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_tournois`
--

CREATE TABLE IF NOT EXISTS `pok_tab_tournois` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `nbJetonsTapis` int(11) NOT NULL,
  `valeurTapis` int(11) NOT NULL,
  `roundEnCours` int(3) NOT NULL,
  `etatDecompte` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `pok_tab_tournois`
--

INSERT INTO `pok_tab_tournois` (`id`, `titre`, `dateCreation`, `dateDebut`, `dateFin`, `auteur`, `nbJetonsTapis`, `valeurTapis`, `roundEnCours`, `etatDecompte`) VALUES
(1, 'essai', '2013-09-17 14:54:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'FRO', 0, 0, 0, ''),
(2, 'essai', '2013-09-17 14:55:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'FRO', 0, 0, 0, ''),
(3, 'essai', '2013-09-17 14:56:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'FRO', 0, 0, 0, ''),
(4, 'essai', '2013-09-17 14:57:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'FRO', 0, 0, 0, ''),
(5, 'fgdfdfg', '2013-09-17 14:58:30', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'FRO', 1500, 5, 1, 'init');

-- --------------------------------------------------------

--
-- Structure de la table `pok_tab_utilisateurs`
--

CREATE TABLE IF NOT EXISTS `pok_tab_utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `code_user` varchar(10) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `profile` int(4) NOT NULL,
  `description` varchar(250) NOT NULL,
  `montrer_aide_ihm` int(2) NOT NULL DEFAULT '1',
  `mail` varchar(100) NOT NULL,
  `actif` int(2) NOT NULL,
  `date_creation` datetime NOT NULL,
  `date_modif` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_user` (`code_user`),
  KEY `profile` (`profile`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `pok_tab_utilisateurs`
--

INSERT INTO `pok_tab_utilisateurs` (`id`, `login`, `password`, `code_user`, `nom`, `prenom`, `profile`, `description`, `montrer_aide_ihm`, `mail`, `actif`, `date_creation`, `date_modif`) VALUES
(1, 'FRO', 'hunter', 'FRO', 'Rosito', 'Fabrice', 1, '', 0, 'fabrice.rosito@gmail.com', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'JLP', 'JLP', 'JLP', 'Perrin', 'Jean-Loup', 30, '', 1, 'jlperrinperso@gmail.com', 1, '2013-09-23 00:00:00', '0000-00-00 00:00:00'),
(3, 'AUM', 'AUM', 'AUM', 'Mondésir', 'Aurore', 30, '', 1, 'darkninette@gmail.com', 1, '2013-09-23 00:00:00', '0000-00-00 00:00:00');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `pok_tab_menu`
--
ALTER TABLE `pok_tab_menu`
  ADD CONSTRAINT `pok_tab_menu_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `pok_tab_menu_categorie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `pok_tab_menu_rangs_droit`
--
ALTER TABLE `pok_tab_menu_rangs_droit`
  ADD CONSTRAINT `pok_tab_menu_rangs_droit_ibfk_1` FOREIGN KEY (`id_rang`) REFERENCES `pok_tab_rangs` (`indice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `pok_tab_service_mail_dest`
--
ALTER TABLE `pok_tab_service_mail_dest`
  ADD CONSTRAINT `pok_tab_service_mail_dest_ibfk_1` FOREIGN KEY (`id_type_mail`) REFERENCES `pok_tab_service_mail` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pok_tab_service_mail_dest_ibfk_2` FOREIGN KEY (`code_user`) REFERENCES `pok_tab_utilisateurs` (`code_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `pok_tab_statistiques_site`
--
ALTER TABLE `pok_tab_statistiques_site`
  ADD CONSTRAINT `pok_tab_statistiques_site_ibfk_1` FOREIGN KEY (`code_user`) REFERENCES `pok_tab_utilisateurs` (`code_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `pok_tab_utilisateurs`
--
ALTER TABLE `pok_tab_utilisateurs`
  ADD CONSTRAINT `pok_tab_utilisateurs_ibfk_1` FOREIGN KEY (`profile`) REFERENCES `pok_tab_rangs` (`indice`) ON DELETE NO ACTION ON UPDATE NO ACTION;
