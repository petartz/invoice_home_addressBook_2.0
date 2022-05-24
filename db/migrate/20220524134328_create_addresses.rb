class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :street, null: false
      t.string :town, null: false
      t.string :zip_code, null: false
      t.string :state
      t.string :country
      t.references :person, foreign_key: true

      t.timestamps
    end
  end
end
