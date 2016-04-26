package com.muzavan.userpc.cityplanner;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;

public class ModeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mode);

        Button buttonCityBuildMode = (Button) findViewById(R.id.buttonCityBuildMode);
        Button buttonCityWatchMode = (Button) findViewById(R.id.buttonCityWatchMode);


    }
}
