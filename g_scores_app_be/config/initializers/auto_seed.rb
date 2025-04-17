# Ensure the Student model is loaded
require_dependency Rails.root.join("app", "models", "application_record.rb")
require_dependency Rails.root.join("app", "models", "student.rb")
require_dependency Rails.root.join("app", "models", "subject.rb")


Rails.application.config.after_initialize do
  # Check if the database exists before running the seed logic
  begin
    if ActiveRecord::Base.connection.table_exists?("students") && Student.count.zero?
      Rails.logger.info "No data found in the database. Running seeds..."
      load Rails.root.join("db", "seeds.rb")
    end
  rescue ActiveRecord::NoDatabaseError
    Rails.logger.info "Database does not exist yet. Skipping seed execution."
  end
end
