class Person < ApplicationRecord
  belongs_to :user
  has_many :phones
  has_many :addresses
  has_many :emails

  validates :salutation, inclusion: {in: ["Mr.", "Mrs.", "Ms."]}
  validates :first_name, presence: true
  validates :last_name, presence: true

  SALUTATION_OPTIONS = [
    ["Mr.", "Mr."],
    ["Mrs.", "Mrss"],
    ["Ms.", "Ms."]
  ]
end
