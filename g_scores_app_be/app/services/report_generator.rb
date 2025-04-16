class ReportGenerator
  def initialize(subject)
    @subject = subject
  end

  def levels
    sql = <<-SQL
      SELECT
        SUM(CASE WHEN #{@subject} >= 8 THEN 1 ELSE 0 END) AS level_1,
        SUM(CASE WHEN #{@subject} >= 6 AND #{@subject} < 8 THEN 1 ELSE 0 END) AS level_2,
        SUM(CASE WHEN #{@subject} >= 4 AND #{@subject} < 6 THEN 1 ELSE 0 END) AS level_3,
        SUM(CASE WHEN #{@subject} < 4 THEN 1 ELSE 0 END) AS level_4
      FROM students
      WHERE #{@subject} IS NOT NULL
    SQL

    result = ActiveRecord::Base.connection.select_one(sql)

    {
      level_1: result["level_1"].to_i,
      level_2: result["level_2"].to_i,
      level_3: result["level_3"].to_i,
      level_4: result["level_4"].to_i
    }
  end
end
