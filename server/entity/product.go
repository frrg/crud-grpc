package entity

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name  string  `gorm:"type:varchar(100);not null"`
	Price float64 `gorm:"type:float;not null"`
}
