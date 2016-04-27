package com.muzavan.userpc.cityplanner;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by user pc on 4/26/2016.
 */
public class CityWatchFragment extends Fragment {
    public ArrayList<Integer> selectedZona = new ArrayList<>();
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View out = inflater.inflate(R.layout.fragment_city_watch,container,false);
        TextView map_box = (TextView) out.findViewById(R.id.map_box);
        map_box.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(out.getContext(), DetailActivity.class);
                startActivity(intent);
            }
        });

        Button filterZona = (Button) out.findViewById(R.id.filter_zona);
        filterZona.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final CharSequence[] items = {"Permukiman","Perdagangan dan Jasa","Perkantoran","Sarana Pelayanan Umum","Pertahanan dan Keamanan","Lindung Alami"};
                final ArrayList<Integer> selectedZonas = new ArrayList<>();
                AlertDialog dialog = new AlertDialog.Builder(getContext())
                        .setTitle("Select The Difficulty Level")
                        .setMultiChoiceItems(items, null, new DialogInterface.OnMultiChoiceClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int indexSelected, boolean isChecked) {
                                if (isChecked) {
                                    // If the user checked the item, add it to the selected items
                                    selectedZonas.add(indexSelected);
                                } else if (selectedZonas.contains(indexSelected)) {
                                    // Else, if the item is already in the array, remove it
                                    selectedZonas.remove(Integer.valueOf(indexSelected));
                                }
                            }
                        }).setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int id) {
                                selectedZona.addAll(selectedZonas);
                            }
                        }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int id) {
                                // selected zona tidak usah disimpan
                            }
                        }).create();
                dialog.show();
            }
        });
        return out;
    };
}
