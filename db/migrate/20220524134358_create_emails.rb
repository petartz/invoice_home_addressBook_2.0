class CreateEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :emails do |t|
      t.string :email_address, null: false
      t.text :comment
      t.references :person, foreign_key: true

      t.timestamps
    end
  end
end
