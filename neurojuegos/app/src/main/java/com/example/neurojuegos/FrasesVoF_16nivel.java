package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class FrasesVoF_16nivel extends AppCompatActivity {
    private TextView puntuajeTextView16;
    private String nombreJugadorActual;
    private int nivelActual=16;

    int puntos=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_frases_vo_f16nivel);
        puntuajeTextView16=(TextView)findViewById(R.id.puntuaje_frasesvof16) ;

        // Obtener la referencia del botón verificar
        Button verificarButton16 = findViewById(R.id.verificar16activity_vof);

        // Agregar el método onClick al botón verificar
        verificarButton16.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Verificar16Respuesta();
            }
        });

        // Obtener la referencia del botón volver a niveles
        ImageView regresarANiveles16 = findViewById(R.id.regresarANiveles16);

        // Agregar el método onClick del botón volver a niveles
        regresarANiveles16.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });
    }

    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_frasesvof.class);
        startActivity(i);

    }

    public void Verificar16Respuesta() {
        // Obtener las referencias a los RadioButtons seleccionados en cada RadioGroup
        RadioButton rbVerdaderoSeleccionado1 = findViewById(R.id.radio1_frasev);
        RadioButton rbFalsoSeleccionado2 = findViewById(R.id.radio2_frasef);
        RadioButton rbVerdaderoSeleccionado3 = findViewById(R.id.radio3_frasev);
        RadioButton rbFalsoSeleccionado4 = findViewById(R.id.radio4_frasef);

        // Verificar si las respuestas son correctas
        if (rbFalsoSeleccionado2.isChecked() && rbVerdaderoSeleccionado3.isChecked()) {
            // Obtener la puntuación actual del TextView
            puntos = 2;

            // Actualizar el valor del puntuaje en el TextView
            puntuajeTextView16.setText(String.valueOf(puntos));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////se mostro puntos
            int valor = 16;

            AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
            SQLiteDatabase db = admin.getWritableDatabase();
            SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
            String savedNames = preferences.getString("nombreJugadorActual", "");


            Cursor cursor = db.query("datos", new String[]{"nivel"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int nivelmax = 0;
            if (cursor.moveToFirst()) {
                nivelmax = cursor.getInt(0);
            }

            if(valor > nivelmax) {
                // Construir los valores a actualizar
                ContentValues values = new ContentValues();
                values.put("nivel", valor);

                // Actualizar la fila correspondiente en la tabla 'datos'
                db.update("datos", values, "nombre = ?", new String[]{savedNames});

                // Cerrar la base de datos
                db.close();
            }

            guardarBaseDedatos();

            Toast.makeText(this, "FELICIDADES HAS SUPERADO TODOS LOS MINIJUEGOS DE FRASES VERDADERAS O FALSAS.", Toast.LENGTH_LONG).show();

            nivelActual=16;
            // Después de incrementar nivelActual
            Intent intent = new Intent(FrasesVoF_16nivel.this, Victoria.class);
            intent.putExtra("nivelActual", nivelActual);
            startActivity(intent);


        } else {
            Toast.makeText(this, "Lo siento, respuesta incorrecta.", Toast.LENGTH_SHORT).show();
        }
    }

    private void guardarBaseDedatos(){

        // Obtener la puntuación acumulada actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionFrasesVoF"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAcumulada = 0;
        if (cursor.moveToFirst()) {
            puntuacionAcumulada = cursor.getInt(0);
        }
        cursor.close();

        // Sumar la puntuación actual a la puntuación acumulada
        int puntuacionNueva = puntos + puntuacionAcumulada;

        // Crear un ContentValues con los valores a insertar
        ContentValues registro = new ContentValues();
        registro.put("puntuacionFrasesVoF", puntuacionNueva);

        // Actualizar la base de datos con la nueva puntuación acumulada
        db.update("datos", registro, "nombre=?", new String[]{savedNames});
        db.close();




    }
}
