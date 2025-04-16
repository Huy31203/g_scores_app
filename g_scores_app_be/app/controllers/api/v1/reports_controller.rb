class Api::V1::ReportsController < ApplicationController
  # GET /api/v1/reports/scores
  def scores
    report = {}

    Student::SUBJECTS.each do |subject|
      report[subject.to_s] = ReportGenerator.new(subject).levels
    end

    render_success(report, "Score distribution report")
  rescue StandardError => e
    # Log the error
    Rails.logger.error "Error generating score report: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")

    # Respond with an error message
    render_error("Failed to generate score distribution report", 500)
  end
end
