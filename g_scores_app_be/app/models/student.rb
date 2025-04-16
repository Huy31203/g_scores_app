class Student < ApplicationRecord
  # Validations
  validates :registration_number, presence: true, uniqueness: true
  validates_numericality_of :math, :physics, :chemistry, allow_nil: true

  SUBJECTS = %i[
    math literature foreign_language
    physics chemistry biology
    history geography civic_education
  ]

  def score_by_subject(subject)
    self[subject]
  end

  def total_group_a_score
    [ math, physics, chemistry ].compact.sum
  end

  def average_score
    valid_scores = SUBJECTS.map { |s| self[s] }.compact
    valid_scores.sum / valid_scores.size
  end
end
