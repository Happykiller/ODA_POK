INSERT INTO `@prefix@api_tab_menu`
  (`id`, `Description`, `Description_courte`, `id_categorie`, `Lien`)
  VALUES
    (NULL, 'Contest charges', 'Contest charges', '98', 'chargesContest');

UPDATE `@prefix@api_tab_menu_rangs_droit` a
  INNER JOIN `@prefix@api_tab_menu` b
    ON b.`Lien` = 'chargesContest'
  INNER JOIN `@prefix@api_tab_rangs` c
    ON c.`id` = a.`id_rang`
    AND c.`indice` in (1,10)
  SET `id_menu` = concat(`id_menu`,b.`id`,';');

CREATE TABLE IF NOT EXISTS `@prefix@tab_contest_charges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idContest` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `part` DOUBLE(6,2)  NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `@prefix@tab_contest_charges_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idContestCharges` int(11) NOT NULL,
  `expenditure` DOUBLE(6,2),
  `profit` DOUBLE(6,2),
  `cmt` VARCHAR(255),
  PRIMARY KEY (`id`)
);