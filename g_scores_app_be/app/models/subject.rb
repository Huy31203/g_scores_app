class Subject < ApplicationRecord
  # Associations
  belongs_to :student

  # Validations
  validates :name, presence: true
  validates :score, numericality: { allow_nil: true }
end
