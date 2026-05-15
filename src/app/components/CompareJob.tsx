import { Play, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface CompareJobProps {
  onStartReview: () => void;
}

export function CompareJob({ onStartReview }: CompareJobProps) {
  const ignoreColumns = ['update_user', 'update_time', 'last_modify', 'timestamp', 'created_at'];

  return (
    <div className="flex-1 overflow-auto p-6 bg-background">
      <div className="max-w-4xl">
        <h1 className="mb-6">Table Comparison Setup</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Table Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Environment</Label>
                <Select defaultValue="prod">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prod">Production (PROD_DB1)</SelectItem>
                    <SelectItem value="uat">UAT (UAT_DB1)</SelectItem>
                    <SelectItem value="dev">Development (DEV_DB1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Schema</Label>
                <Select defaultValue="app_schema">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app_schema">APP_SCHEMA</SelectItem>
                    <SelectItem value="config_schema">CONFIG_SCHEMA</SelectItem>
                    <SelectItem value="audit_schema">AUDIT_SCHEMA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Table</Label>
                <Select defaultValue="config_rules">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="config_rules">CONFIG_RULES</SelectItem>
                    <SelectItem value="workflow_def">WORKFLOW_DEF</SelectItem>
                    <SelectItem value="stored_procedures">STORED_PROCEDURES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Compare Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sync Direction</Label>
                <Select defaultValue="source_to_target">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="source_to_target">Source → Target</SelectItem>
                    <SelectItem value="target_to_source">Target → Source</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>PK Range (Optional)</Label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="From"
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-input-background"
                  />
                  <input
                    type="text"
                    placeholder="To"
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-input-background"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <Label>Ignored Columns (Backend Configured)</Label>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                The following columns are automatically excluded from comparison
              </p>
              <div className="flex flex-wrap gap-2">
                {ignoreColumns.map((col) => (
                  <Badge key={col} variant="secondary" className="font-mono">
                    {col}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={onStartReview} size="lg" className="gap-2">
            <Play className="w-4 h-4" />
            Run Comparison
          </Button>
        </div>
      </div>
    </div>
  );
}
