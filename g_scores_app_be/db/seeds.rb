require 'csv'

INSERT_BATCH = 100_000
SUBJECT_NAME_MAPPING = {
  'toan' => 'math',
  'ngu_van' => 'literature',
  'ngoai_ngu' => 'foreign_language',
  'vat_li' => 'physics',
  'hoa_hoc' => 'chemistry',
  'sinh_hoc' => 'biology',
  'lich_su' => 'history',
  'dia_li' => 'geography',
  'gdcd' => 'civic_education'
}

csv_path = Rails.root.join('dataset', 'diem_thi_thpt_2024.csv')
students = []
subjects = []

CSV.foreach(csv_path, headers: true, encoding: 'UTF-8').with_index do |row, index|
  students << {
    registration_number: row['sbd'],
    created_at: Time.now,
    updated_at: Time.now
  }

  SUBJECT_NAME_MAPPING.each do |vietnamese_name, english_name|
    score = row[vietnamese_name]&.gsub(',', '.')&.to_f
    if score
      subjects << {
        name: english_name,
        score: score,
        registration_number: row['sbd'],
        created_at: Time.now,
        updated_at: Time.now
      }
    end
  end

  if (index + 1) % INSERT_BATCH == 0
    Student.insert_all(students)
    student_id_map = Student.where(registration_number: students.map { |s| s[:registration_number] }).pluck(:registration_number, :id).to_h

    subjects.each { |subject| subject[:student_id] = student_id_map[subject.delete(:registration_number)] }
    Subject.insert_all(subjects)

    Rails.logger.info "Inserted #{students.size} student and #{subjects.size} subject records."

    students.clear
    subjects.clear
  end
end

# Insert remaining rows
if students.any?
  Student.insert_all(students)
  student_id_map = Student.where(registration_number: students.map { |s| s[:registration_number] }).pluck(:registration_number, :id).to_h

  subjects.each { |subject| subject[:student_id] = student_id_map[subject.delete(:registration_number)] }
  Subject.insert_all(subjects)
end

Rails.logger.info "✅ Seeded student data successfully!"
