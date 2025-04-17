class Student < ApplicationRecord
  # Associations
  has_many :subjects, dependent: :destroy

  # Validations
  validates :registration_number, presence: true, uniqueness: true

  SUBJECT_NAMES = %i[
    math literature foreign_language
    physics chemistry biology
    history geography civic_education
  ]

  def initialize(attributes = {})
    super(attributes)
    SUBJECT_NAMES.each do |name|
      subjects.build(name: name, score: attributes[name])
    end
  end

  def score_by_subject(subject_name)
    subject = subjects.find_by(name: subject_name)
    subject&.score
  end

  def total_group_a_score
    group_a_subjects = %w[math physics chemistry]
    subjects.where(name: group_a_subjects).sum(:score)
  end
end
